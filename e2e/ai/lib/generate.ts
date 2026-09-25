import fs from 'fs';
import path from 'path';

import { promptFile, readSchema } from './assets';
import {
  createCheckout,
  exportPairedSource,
  removeCheckout,
  restoreFromParent,
} from './checkout';
import {
  AI_DIR,
  REPO_ROOT,
  existingKnowledgeDirs,
  existingPairedRepoDir,
  isSmallChange,
  stageConfigFor,
  workRoot,
  type PipelineConfig,
} from './config';
import {
  createManifest,
  fail,
  transition,
  writeManifest,
  type Decision,
  type RunManifest,
} from './manifest';
import {
  buildSourceIndex,
  checkGrounding,
  formatIssue,
  type GroundingReport,
  type SourceIndex,
} from './grounding';
import { buildPillsIndex, renderPillsIndex } from './pills';
import { executePlan, publishPlan, redraftPlan } from './publish';
import { renderPrBody } from './render';
import type { StageMode } from './runStage';
import { createStageRunner } from './stageRunner';
import { parseScenarios, summarize, type Scenario } from './scenarios';
import { fromBranch, fromPr, type Gathered } from './source';
import type { DraftPr } from './github';
import { gh, git } from './shell';
import { behaviourFiles, ruleBasedSkip } from './triage';
import { changeSize, keepFiles } from './diff';

export type GenerateOptions = {
  pr?: number;
  branch?: string;
  base?: string;
  ticket?: string;
  mode: StageMode;
  publish: boolean;
  keepWork: boolean;
  modelTriage: boolean;
  // Redraft onto the existing draft PR, starting from its current (possibly edited) scenarios.
  redraft?: {
    draft: DraftPr;
    previous: RunManifest;
    notes: string;
    by: string;
  };
  // Restore the PR's own e2e files to pre-PR state so the output can't copy them.
  hideOwnE2e?: boolean;
};

type TriageOutput = { e2e_worthy: boolean; reason: string };
type PlanOutput = {
  scenarios_file: string;
  pills_read: string[];
  summary: string;
  decisions: Decision[];
};
type ReviewOutput = {
  verdict: 'approved' | 'needs_revision';
  corrections: {
    scenario_id: string;
    problem: string;
    fix: string;
    source: string;
  }[];
  coverage_gaps: { description: string; suggested_scenario: string }[];
  notes: string;
};

export type GenerateResult = {
  manifest: RunManifest;
  scenarios: Scenario[];
  scenariosDir?: string;
  prBodyFile?: string;
  prUrl?: string;
  stoppedBefore?: string;
};

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const runId = (options: GenerateOptions) =>
  options.pr ? `pr-${options.pr}` : `branch-${slug(options.branch ?? '')}`;

const writeInputs = (
  inputDir: string,
  gathered: Gathered,
  config: PipelineConfig,
  hidden: Set<string>,
) => {
  fs.mkdirSync(inputDir, { recursive: true });
  const { source } = gathered;
  const diff = keepFiles(
    gathered.patch,
    (file) => behaviourFiles([file], config.skip).length > 0,
  );
  const omitted = new Set(diff.omitted);
  const pairedDiff =
    gathered.paired &&
    keepFiles(
      gathered.paired.patch,
      (file) =>
        !config.pairedBehaviour ||
        behaviourFiles([file], config.pairedBehaviour).length > 0,
    );
  const pr = [
    `# ${source.title}`,
    '',
    source.url
      ? `PR: ${source.url}`
      : `Branch: ${source.headRef} (into ${source.baseRef})`,
    `Author: ${source.author ?? 'unknown'} · Ticket: ${source.ticket ?? 'none'} · Commit: ${source.sha}`,
    gathered.paired
      ? `Paired cias-api PRs: ${gathered.paired.change.prs.map((p) => `#${p.number} (${p.state}) ${p.title}`).join('; ')}`
      : 'Paired cias-api PRs: none found',
    ...(pairedDiff && pairedDiff.omitted.length > 0
      ? [
          `paired-api.patch holds their behaviour files only; ${pairedDiff.omitted.length} spec/tooling file(s) are left out.`,
        ]
      : []),
    '',
    '## Description',
    '',
    gathered.body.trim() || '(none)',
    '',
    '## Changed files',
    '',
    'Files marked "not in diff.patch" can\'t change behaviour (tests, snapshots, translations, tooling); read them',
    'in the checkout only if you need to.',
    '',
    ...source.changedFiles
      .filter((file) => !hidden.has(file))
      .map(
        (file) => `- ${file}${omitted.has(file) ? ' (not in diff.patch)' : ''}`,
      ),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(inputDir, 'pr.md'), pr);
  fs.writeFileSync(path.join(inputDir, 'diff.patch'), diff.patch);
  if (pairedDiff)
    fs.writeFileSync(path.join(inputDir, 'paired-api.patch'), pairedDiff.patch);
  fs.copyFileSync(
    path.join(AI_DIR, 'CONVENTIONS.md'),
    path.join(inputDir, 'CONVENTIONS.md'),
  );
  const knowledgeDirs = existingKnowledgeDirs(config);
  fs.writeFileSync(
    path.join(inputDir, 'pills-index.md'),
    renderPillsIndex(buildPillsIndex(knowledgeDirs)),
  );
  return { knowledgeDirs, size: changeSize(diff.patch) };
};

const inputList = (inputDir: string) =>
  [
    'pr.md',
    'diff.patch',
    'paired-api.patch',
    'pills-index.md',
    'CONVENTIONS.md',
    'previous-scenarios.md',
    'notes.md',
  ]
    .filter((file) => fs.existsSync(path.join(inputDir, file)))
    .map((file) => `- ${path.join(inputDir, file)}`)
    .join('\n');

const formatCorrections = (review: ReviewOutput): string[] => [
  ...review.corrections.map((c) => `${c.scenario_id}: ${c.problem} → ${c.fix}`),
  ...review.coverage_gaps.map((g) => `coverage gap: ${g.description}`),
];

export const generate = (
  options: GenerateOptions,
  config: PipelineConfig,
): GenerateResult => {
  const id = runId(options);
  const runDir = path.join(workRoot(), id);
  const inputDir = path.join(runDir, 'input');
  const stageDir = path.join(runDir, 'stages');
  fs.rmSync(inputDir, { recursive: true, force: true });

  const gathered = options.pr
    ? fromPr(options.pr, config, options.ticket)
    : fromBranch(
        options.branch ?? '',
        options.base ?? `origin/${config.baseBranch}`,
        config,
        options.ticket,
      );

  let manifest = createManifest(id, gathered.source);
  if (gathered.paired) manifest.paired = gathered.paired.change;
  if (options.redraft) {
    manifest.stages = options.redraft.previous.stages;
    manifest.totalCostUsd = options.redraft.previous.totalCostUsd;
  }
  const save = () => writeManifest(runDir, manifest);
  save();

  const rules = ruleBasedSkip(
    {
      author: gathered.source.author,
      headRef: gathered.source.headRef,
      labels: gathered.source.labels,
      changedFiles: gathered.source.changedFiles,
    },
    config.skip,
  );
  if (rules.skip) {
    manifest = {
      ...transition(manifest, 'skipped'),
      triage: { ...rules, by: 'rules' },
    };
    save();
    return { manifest, scenarios: [] };
  }

  const ownE2e = options.hideOwnE2e
    ? gathered.source.changedFiles.filter((file) =>
        file.startsWith(`${config.e2e.dir}/`),
      )
    : [];
  const { knowledgeDirs, size } = writeInputs(
    inputDir,
    gathered,
    config,
    new Set(ownE2e),
  );
  manifest.knowledge.dirs = knowledgeDirs;
  // Effort and budget scale with the change, not with the size of the app.
  const small = isSmallChange(config, size);
  manifest.change = { ...size, small };
  const planConfig = stageConfigFor(config, 'plan', small);
  const reviewConfig = stageConfigFor(config, 'review', small);
  const pairedRepo = existingPairedRepoDir(config);
  const paired = pairedRepo
    ? exportPairedSource(pairedRepo, runDir, config.baseBranch)
    : undefined;
  if (paired)
    manifest.knowledge.pairedSource = { ref: paired.ref, sha: paired.sha };
  save();
  const checkout = createCheckout(runDir, gathered.source.sha);
  restoreFromParent(checkout, ownE2e);
  const scenariosDir = `${config.scenariosDir}/${id}`;
  const scenariosFile = `${scenariosDir}/scenarios.md`;
  if (options.redraft) {
    fs.writeFileSync(
      path.join(inputDir, 'previous-scenarios.md'),
      git(
        ['show', `${options.redraft.draft.headRefOid}:${scenariosFile}`],
        REPO_ROOT,
      ),
    );
    fs.writeFileSync(
      path.join(inputDir, 'notes.md'),
      `# Notes from @${options.redraft.by}\n\n${options.redraft.notes || '(none — redraft from the current version)'}\n`,
    );
  }
  const inputs = [
    inputList(inputDir),
    ...(paired
      ? [
          `- ${paired.dir} — the paired repo's source at ${paired.ref} (${paired.sha.slice(0, 12)}), read-only: close to, not guaranteed to be, what's deployed. Check backend defaults, validation and response codes here instead of guessing or asking.`,
        ]
      : []),
  ].join('\n');
  const sizeLine = small
    ? `Change size: ${size.files} behaviour file(s), ${size.changedLines} changed line(s) — a small change. Read the changed files, their direct callers and the one or two pills that cover them; don't survey the rest of the app.`
    : `Change size: ${size.files} behaviour files, ${size.changedLines} changed lines.`;

  const stage = createStageRunner({
    config,
    mode: options.mode,
    stageDir,
    cwd: checkout,
    readDirs: [inputDir, ...knowledgeDirs, ...(paired ? [paired.dir] : [])],
    getManifest: () => manifest,
    setManifest: (next) => {
      manifest = next;
      save();
    },
  });

  const stopped = (before: string): GenerateResult => {
    console.log(
      `\n[dry-run] stopped before ${before}. Inputs: ${inputDir} · checkout: ${checkout}`,
    );
    return { manifest, scenarios: [], stoppedBefore: before };
  };

  const validate = () => {
    const file = path.join(checkout, scenariosFile);
    return fs.existsSync(file)
      ? parseScenarios(fs.readFileSync(file, 'utf8'))
      : { scenarios: [], errors: [`${scenariosFile} was not written`] };
  };

  let sourceIndex: SourceIndex | undefined;
  const groundingFile = path.join(inputDir, 'grounding.json');
  const ground = (scenarios: Scenario[]): GroundingReport => {
    const file = path.join(checkout, scenariosFile);
    sourceIndex ??= buildSourceIndex({
      checkout,
      pagesDir: config.e2e.pagesDir,
      selectorAttribute: config.e2e.selectorAttribute,
      pairedDir: paired?.dir,
      otherRoots: [inputDir, ...knowledgeDirs],
    });
    const report = fs.existsSync(file)
      ? checkGrounding(scenarios, fs.readFileSync(file, 'utf8'), sourceIndex)
      : {
          checked: { testIds: 0, files: 0, pageObjects: 0 },
          issues: [],
          hints: [],
        };
    fs.writeFileSync(groundingFile, `${JSON.stringify(report, null, 2)}\n`);
    return report;
  };

  let currentStage = 'triage';
  try {
    if (config.stages.triage.enabled && options.modelTriage) {
      const triage = stage<TriageOutput>('triage', config.stages.triage, {
        instructionsFile: promptFile('triage'),
        prompt: `Decide whether this change needs E2E scenarios.\n\nInputs:\n${inputList(inputDir)}`,
        schema: readSchema('triage'),
        tools: ['Read'],
        writeRoots: [],
        outputs: [],
      });
      if (!triage) {
        console.log('[dry-run] continuing as if triage answered yes');
      } else {
        manifest.triage = {
          skip: !triage.output.e2e_worthy,
          reason: triage.output.reason,
          by: 'model',
        };
        if (!triage.output.e2e_worthy) {
          manifest = transition(manifest, 'skipped');
          save();
          return { manifest, scenarios: [] };
        }
      }
    }

    currentStage = 'plan';
    const plan = stage<PlanOutput>('plan', planConfig, {
      instructionsFile: promptFile('plan'),
      prompt: [
        'Draft E2E scenarios for this change.',
        sizeLine,
        '',
        `Inputs:\n${inputs}`,
        '',
        `Your working directory is the repo at commit ${gathered.source.sha}.`,
        `Write the scenarios to ${scenariosFile} (relative to the working directory).`,
        ...(options.redraft
          ? [
              '',
              'This is a redraft the developer asked for. Start from previous-scenarios.md — their current version,',
              'including any edits they made — and follow notes.md. Keep what they changed unless the notes say',
              'otherwise, and keep the IDs of the scenarios you keep.',
            ]
          : []),
      ].join('\n'),
      schema: readSchema('plan'),
      tools: ['Read', 'Grep', 'Glob', 'Write', 'Edit'],
      writeRoots: [scenariosDir],
      outputs: [scenariosFile],
    });
    if (!plan) return stopped('plan');
    manifest.knowledge.pillsRead = plan.output.pills_read;
    let { decisions } = plan.output;
    manifest = transition(manifest, 'generated');
    save();

    let revisions = 0;
    let review: ReviewOutput | undefined;
    let parsed = validate();
    let grounding = ground(parsed.scenarios);
    const groundingIssuesFound = grounding.issues.length;
    for (;;) {
      currentStage = `review-${revisions + 1}`;
      const reviewed = stage<ReviewOutput>(currentStage, reviewConfig, {
        instructionsFile: promptFile('review'),
        prompt: [
          `Review ${scenariosFile} (relative to the working directory) against the change.`,
          sizeLine,
          '',
          `Inputs:\n${inputs}`,
          `- ${groundingFile} — what a script already checked: every test id, cited file and line range, and page-object method.`,
        ].join('\n'),
        schema: readSchema('review'),
        tools: ['Read', 'Grep', 'Glob'],
        writeRoots: [],
        outputs: [],
      });
      if (!reviewed) return stopped(currentStage);
      review = reviewed.output;

      const needsWork =
        review.verdict === 'needs_revision' ||
        parsed.errors.length > 0 ||
        grounding.issues.length > 0;
      if (!needsWork || revisions >= reviewConfig.maxRevisions) break;

      revisions += 1;
      const findingsFile = path.join(inputDir, `review-${revisions}.json`);
      fs.writeFileSync(
        findingsFile,
        JSON.stringify(
          {
            ...review,
            format_errors: parsed.errors,
            grounding_errors: grounding.issues.map(formatIssue),
          },
          null,
          2,
        ),
      );
      currentStage = `revise-${revisions}`;
      const revised = stage<PlanOutput>(currentStage, planConfig, {
        instructionsFile: promptFile('plan'),
        prompt: [
          `Revise the scenarios in ${scenariosFile} (relative to the working directory) and rewrite the file in place.`,
          '',
          `Findings to apply: ${findingsFile}`,
          '- Apply every correction.',
          '- Add scenarios for coverage gaps only when they are in scope of the change.',
          '- Fix every entry in format_errors — the file is parsed.',
          '- Fix every entry in grounding_errors — a script found those references missing from the code. Cite what exists, or drop the claim.',
          '- Keep the IDs of the scenarios you keep; never renumber.',
          '- Keep `## Decisions` in step with the scenarios: record each judgement call you make, including any a correction asks for.',
          '',
          `Inputs, as before:\n${inputs}`,
        ].join('\n'),
        schema: readSchema('plan'),
        tools: ['Read', 'Grep', 'Glob', 'Write', 'Edit'],
        writeRoots: [scenariosDir],
        outputs: [scenariosFile],
      });
      if (!revised) return stopped(currentStage);
      manifest.knowledge.pillsRead = [
        ...new Set([
          ...manifest.knowledge.pillsRead,
          ...revised.output.pills_read,
        ]),
      ];
      ({ decisions } = revised.output);
      parsed = validate();
      grounding = ground(parsed.scenarios);
      // Reviewer approved and this revision only fixed references: the re-check replaces a second review.
      if (
        review.verdict === 'approved' &&
        parsed.errors.length === 0 &&
        grounding.issues.length === 0
      )
        break;
    }

    currentStage = 'validate';
    if (parsed.errors.length > 0) {
      throw new Error(
        `scenarios.md is still malformed after ${revisions} revision(s): ${parsed.errors.join('; ')}`,
      );
    }

    manifest = transition(manifest, 'reviewed');
    manifest.scenarios = summarize(parsed.scenarios);
    manifest.review = {
      revisions,
      verdict: review?.verdict ?? 'needs_revision',
      unresolvedCorrections: [
        ...(review?.verdict === 'needs_revision'
          ? formatCorrections(review)
          : []),
        ...grounding.issues.map((issue) => `grounding — ${formatIssue(issue)}`),
      ],
    };
    manifest.grounding = {
      checked: Object.values(grounding.checked).reduce((a, b) => a + b, 0),
      issuesFound: groundingIssuesFound,
      issuesLeft: grounding.issues.length,
      hints: grounding.hints.length,
    };
    manifest.decisions = decisions;
    if (options.publish) manifest = transition(manifest, 'awaiting-approval');

    const outputDir = path.join(checkout, scenariosDir);
    writeManifest(outputDir, manifest);
    fs.writeFileSync(
      path.join(outputDir, 'review.json'),
      `${JSON.stringify(review, null, 2)}\n`,
    );
    save();
    const prBodyFile = path.join(runDir, 'pr-body.md');
    fs.writeFileSync(prBodyFile, renderPrBody(manifest, parsed.scenarios));

    let prUrl: string | undefined;
    if (options.publish && options.redraft) {
      currentStage = 'publish';
      const { draft, by } = options.redraft;
      const publishCheckout = createCheckout(
        runDir,
        draft.headRefOid,
        'publish-checkout',
      );
      try {
        fs.cpSync(outputDir, path.join(publishCheckout, scenariosDir), {
          recursive: true,
          force: true,
        });
        executePlan(
          redraftPlan(config, manifest, publishCheckout, prBodyFile, draft),
        );
      } finally {
        removeCheckout(publishCheckout);
      }
      gh([
        'pr',
        'comment',
        String(draft.number),
        '-R',
        config.repo,
        '--body',
        `@${by} — redrafted the scenarios with your notes. Review them, then comment \`/e2e approve\`.`,
      ]);
      prUrl = draft.url;
    } else if (options.publish) {
      currentStage = 'publish';
      prUrl = executePlan(
        publishPlan(config, manifest, checkout, prBodyFile),
      ).pop();
      if (prUrl && manifest.source.author) {
        gh([
          'pr',
          'comment',
          prUrl,
          '--body',
          `@${manifest.source.author} — E2E scenarios for your change are ready for review. Edit them here, then comment \`/e2e approve\`.`,
        ]);
      }
    } else {
      fs.cpSync(outputDir, path.join(REPO_ROOT, scenariosDir), {
        recursive: true,
      });
    }

    return {
      manifest,
      scenarios: parsed.scenarios,
      scenariosDir: options.publish
        ? undefined
        : path.join(REPO_ROOT, scenariosDir),
      prBodyFile,
      prUrl,
    };
  } catch (error) {
    manifest = fail(
      manifest,
      currentStage,
      error instanceof Error ? error.message : String(error),
    );
    save();
    throw error;
  } finally {
    if (!options.keepWork && options.mode.kind !== 'dry-run') {
      removeCheckout(checkout);
      if (paired) fs.rmSync(paired.dir, { recursive: true, force: true });
    }
  }
};
