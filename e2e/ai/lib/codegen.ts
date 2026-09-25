import fs from 'fs';
import path from 'path';

import { checkApproval } from './approve';
import { healInstructions, promptFile, readSchema } from './assets';
import { createCheckout, removeCheckout } from './checkout';
import {
  AI_REL,
  REPO_ROOT,
  pipelinePaths,
  workRoot,
  type E2eConfig,
  type PipelineConfig,
} from './config';
import { markFixme } from './fixme';
import {
  fail,
  readManifest,
  transition,
  writeManifest,
  type RunManifest,
} from './manifest';
import { renderReadyBody } from './render';
import type { StageMode } from './runStage';
import { parseScenarios, type Scenario } from './scenarios';
import { startAppServer, type AppServer } from './server';
import {
  currentLogin,
  manifestAt,
  permissionOf,
  scenariosChangedSince,
  viewDraft,
  type DraftPr,
} from './github';
import { gh, git, runResult } from './shell';
import { specResults } from './specResults';
import { createStageRunner, type StageFields } from './stageRunner';
import { behaviourFiles } from './triage';
import {
  gitBaseline,
  verifySetup,
  lintGate,
  listCheck,
  runLive,
  typecheck,
  type LiveTest,
  type Problem,
} from './verify';
import {
  changedFiles,
  linkDependencies,
  overlayTooling,
  toolingPaths,
  trackedSpecs,
} from './workspace';

const mcp = (tool: string) => `mcp__playwright-test__${tool}`;

// Left out on purpose: generator_write_test and other tools that write files
// (they bypass the write guard), and browser_run_code/evaluate (arbitrary code).
const CODEGEN_MCP_TOOLS = [
  'generator_setup_page',
  'generator_read_log',
  'browser_snapshot',
  'browser_generate_locator',
  'browser_click',
  'browser_type',
  'browser_fill_form',
  'browser_select_option',
  'browser_press_key',
  'browser_hover',
  'browser_drag',
  'browser_navigate',
  'browser_navigate_back',
  'browser_wait_for',
  'browser_handle_dialog',
  'browser_tabs',
  'browser_verify_element_visible',
  'browser_verify_list_visible',
  'browser_verify_text_visible',
  'browser_verify_value',
  'browser_network_requests',
  'browser_console_messages',
  'test_list',
  'test_run',
  'test_debug',
].map(mcp);

// The stock healer's own tool list.
const HEAL_MCP_TOOLS = [
  'test_list',
  'test_run',
  'test_debug',
  'browser_snapshot',
  'browser_generate_locator',
  'browser_console_messages',
  'browser_network_requests',
  'browser_evaluate',
].map(mcp);

export type CodegenOptions = {
  runId?: string;
  pr?: number;
  approver?: string;
  baseRef?: string;
  mode: StageMode;
  publish: boolean;
  keepWork: boolean;
  live: boolean;
};

export type CodegenResult = {
  manifest: RunManifest;
  scenarios: Scenario[];
  checkout: string;
  bodyFile?: string;
  prUrl?: string;
  stoppedBefore?: string;
};

type CodegenOutput = {
  tests: { scenario_id: string; file: string; title: string; fixme: boolean }[];
  notes: string;
};
type HealOutput = {
  fixed: { title: string; change: string }[];
  fixme: { title: string; reason: string }[];
  notes: string;
};

type Target = {
  manifest: RunManifest;
  sha: string;
  approver: string;
  pr?: DraftPr;
  scenariosSource?: string;
};

const resolvePr = (
  pr: number,
  options: CodegenOptions,
  config: PipelineConfig,
): Target => {
  const draft = viewDraft(pr, config);
  const approver = options.approver ?? currentLogin();
  const manifest = manifestAt(draft, config);
  const check = checkApproval({
    pr: draft,
    approver,
    permission: permissionOf(approver, config),
    runState: manifest.state,
    scenariosChangedSinceApproval: manifest.approval
      ? scenariosChangedSince(manifest.approval.sha, draft, config)
      : false,
    branchPrefix: config.branchPrefix,
  });
  if (!check.ok)
    throw new Error(`not approving #${draft.number}: ${check.reason}`);
  return { manifest, sha: draft.headRefOid, approver, pr: draft };
};

const resolveLocal = (
  runId: string,
  options: CodegenOptions,
  config: PipelineConfig,
): Target => {
  const source = path.join(REPO_ROOT, config.scenariosDir, runId);
  if (!fs.existsSync(source)) {
    throw new Error(
      `no scenarios at ${source} — run \`npm run e2e:ai -- generate\` first`,
    );
  }
  const manifest = readManifest(source);
  if (manifest.state !== 'reviewed') {
    throw new Error(
      `run ${runId} is ${manifest.state}; local codegen takes scenarios fresh from generate`,
    );
  }
  let approver = options.approver ?? 'local';
  try {
    approver = options.approver ?? git(['config', 'user.name']);
  } catch {
    // No git identity: keep "local".
  }
  const base = options.baseRef ?? `origin/${config.baseBranch}`;
  return {
    manifest,
    sha: git(['rev-parse', base], REPO_ROOT),
    approver,
    scenariosSource: source,
  };
};

const codegenPrompt = (input: {
  scenariosFile: string;
  specIds: string[];
  sha: string;
  pageObjects: string[];
  appFiles: string[];
  previousSpecs: string[];
  readOnly: string[];
  e2e: E2eConfig;
  live: boolean;
}) =>
  [
    `Automate the approved \`spec\` scenarios in ${input.scenariosFile}: ${input.specIds.join(', ')}.`,
    '',
    `The code under test is the working directory, at commit ${input.sha}.`,
    `House rules: ${AI_REL}/CONVENTIONS.md.`,
    `Existing page objects (${input.e2e.pagesDir}): ${input.pageObjects.join(', ') || 'none'}.`,
    `Read-only: every existing spec, ${input.readOnly.join(', ')}.`,
    `Test-id attribute: ${input.e2e.selectorAttribute}. You may add it to these app files only: ${input.appFiles.join(', ') || 'none'}.`,
    ...(input.previousSpecs.length
      ? [
          '',
          `The scenarios changed after an earlier approval. These files hold the specs generated then: ${input.previousSpecs.join(', ')}.`,
          'Update them to match the scenarios as they are now: keep the tests of unchanged scenarios as they are, and rewrite or remove the rest.',
        ]
      : []),
    '',
    input.live
      ? `The app is running and signed in for you. Open a page with generator_setup_page { seedFile: "${pipelinePaths.seed}", project: "${input.e2e.seedProject}" }, and run tests with test_run { locations: [<your spec files>], projects: ["${input.e2e.browserProject}"] }.`
      : 'This run has no browser: derive every locator from the source, and do not call browser or test tools. The specs are checked statically only.',
  ].join('\n');

const healPrompt = (
  problems: Problem[],
  failing: LiveTest[],
  specFiles: string[],
  project: string,
) =>
  [
    'These generated tests need fixing.',
    '',
    ...(problems.length
      ? [
          'Static problems (TypeScript, lint, loading):',
          ...problems.map((p) => `- ${p.message}`),
          '',
        ]
      : []),
    ...(failing.length
      ? [
          'Failing live — each test must pass two runs in a row:',
          ...failing.map(
            (t) =>
              `- ${t.title} (${t.file}:${t.line})\n  ${(t.error ?? '').replace(/\n/g, '\n  ')}`,
          ),
          '',
        ]
      : []),
    `Spec files: ${specFiles.join(', ')}.`,
    `Re-run only these: test_run { locations: ${JSON.stringify(specFiles)}, projects: ["${project}"] }.`,
  ].join('\n');

const tail = (text: string, lines = 8) =>
  text.trim().split('\n').slice(-lines).join('\n');

export const codegen = async (
  options: CodegenOptions,
  config: PipelineConfig,
): Promise<CodegenResult> => {
  let target: Target;
  if (options.pr) target = resolvePr(options.pr, options, config);
  else if (options.runId) target = resolveLocal(options.runId, options, config);
  else
    throw new Error(
      'codegen needs a run (--run <id>) or a draft PR (--pr <number>)',
    );

  let manifest = target.manifest;
  const previousSpecs = (manifest.specs?.files ?? []).filter((file) =>
    file.endsWith('.spec.ts'),
  );
  const { id } = manifest;
  const runDir = path.join(workRoot(), id);
  const stageDir = path.join(runDir, 'stages');
  const scenariosDir = `${config.scenariosDir}/${id}`;
  const scenariosFile = `${scenariosDir}/scenarios.md`;
  const save = () => writeManifest(runDir, manifest);
  const { e2e } = config;
  const setup = verifySetup(config);
  const checkout = createCheckout(runDir, target.sha, 'codegen-checkout');

  let server: AppServer | undefined;
  let currentStage = 'prepare';
  try {
    if (target.pr) {
      // Specs target current code, not the code the scenarios were drafted from.
      git(['fetch', '--no-tags', 'origin', config.baseBranch], checkout);
      try {
        git(['merge', '--no-edit', `origin/${config.baseBranch}`], checkout);
      } catch {
        runResult('git', ['merge', '--abort'], { cwd: checkout });
        throw new Error(
          `merging ${config.baseBranch} into ${target.pr.headRefName} conflicts — resolve it on the branch, then approve again`,
        );
      }
    } else if (target.scenariosSource) {
      fs.cpSync(target.scenariosSource, path.join(checkout, scenariosDir), {
        recursive: true,
      });
    }
    const baseSha = git(['rev-parse', 'HEAD'], checkout);
    const overlaid = overlayTooling(checkout, toolingPaths(e2e));
    linkDependencies(checkout);

    const parsed = parseScenarios(
      fs.readFileSync(path.join(checkout, scenariosFile), 'utf8'),
    );
    if (parsed.errors.length) {
      throw new Error(
        `the approved scenarios.md is malformed: ${parsed.errors.join('; ')}`,
      );
    }
    const specIds = parsed.scenarios
      .filter((s) => s.automation === 'spec')
      .map((s) => s.id);

    if (manifest.state === 'reviewed')
      manifest = transition(manifest, 'awaiting-approval');
    manifest = {
      ...transition(manifest, 'approved'),
      approval: {
        sha: target.sha,
        by: target.approver,
        at: new Date().toISOString(),
      },
    };
    save();

    const port = config.server.port;
    const browserEnv: NodeJS.ProcessEnv = {
      ...process.env,
      E2E_AI: '1',
      E2E_BASE_URL: `http://localhost:${port}`,
    };
    const live = options.live && options.mode.kind !== 'dry-run';
    const commitExclude = [...overlaid, 'node_modules', '.env'];
    const appFiles = behaviourFiles(manifest.source.changedFiles, config.skip);
    const bounds: Pick<StageFields, 'writeRoots' | 'denyRoots'> = {
      writeRoots: [e2e.dir, ...appFiles],
      // Committed specs are off-limits except this run's earlier ones (a re-approval updates them).
      denyRoots: [
        AI_REL,
        ...e2e.readOnly,
        config.scenariosDir,
        ...trackedSpecs(checkout, e2e.dir).filter(
          (file) => !previousSpecs.includes(file),
        ),
      ],
    };
    const browser: Partial<StageFields> = live
      ? {
          mcpConfig: path.join(checkout, pipelinePaths.mcpConfig),
          env: { E2E_AI: '1', E2E_BASE_URL: `http://localhost:${port}` },
          keepE2eCredentials: true,
        }
      : {};

    if (live) {
      currentStage = 'server';
      server = await startAppServer({
        cwd: checkout,
        port,
        env: browserEnv,
        timeoutMinutes: config.server.startTimeoutMinutes,
        logFile: path.join(runDir, 'app-server.log'),
      });
      currentStage = 'sign-in';
      const signIn = runResult(
        path.join(checkout, 'node_modules', '.bin', 'playwright'),
        ['test', `--project=${e2e.authProject}`],
        { cwd: checkout, env: browserEnv },
      );
      if (signIn.status !== 0) {
        throw new Error(
          `the pipeline's staging account couldn't sign in — does it exist (account index 5 of E2E_ADMIN_EMAIL_PATTERN)?\n${tail(signIn.stdout + signIn.stderr)}`,
        );
      }
    }

    const stage = createStageRunner({
      config,
      mode: options.mode,
      stageDir,
      cwd: checkout,
      readDirs: [],
      getManifest: () => manifest,
      setManifest: (next) => {
        manifest = next;
        save();
      },
    });

    currentStage = 'codegen';
    const generated = stage<CodegenOutput>('codegen', config.stages.codegen, {
      instructionsFile: promptFile('codegen'),
      prompt: codegenPrompt({
        scenariosFile,
        specIds,
        sha: baseSha,
        pageObjects: fs
          .readdirSync(path.join(checkout, e2e.pagesDir))
          .filter((file) => file.endsWith('.ts') && file !== 'index.ts'),
        appFiles,
        previousSpecs,
        readOnly: [AI_REL, ...e2e.readOnly, config.scenariosDir],
        e2e,
        live,
      }),
      schema: readSchema('codegen'),
      tools: ['Read', 'Grep', 'Glob', 'Write', 'Edit'],
      mcpTools: live ? CODEGEN_MCP_TOOLS : [],
      outputs: [],
      ...bounds,
      ...browser,
    });
    if (!generated) {
      console.log(
        `\n[dry-run] stopped after codegen's command. Checkout: ${checkout}`,
      );
      return {
        manifest,
        scenarios: parsed.scenarios,
        checkout,
        stoppedBefore: 'codegen',
      };
    }

    const baseline = gitBaseline(checkout, baseSha);
    const collect = () => {
      const files = changedFiles(checkout, [
        ...commitExclude,
        config.scenariosDir,
      ]);
      return {
        files,
        specFiles: files.filter((file) => file.endsWith('.spec.ts')),
        e2eFiles: files.filter((file) => file.startsWith('e2e/')),
      };
    };
    const verify = (round: number) => {
      const { specFiles, e2eFiles } = collect();
      if (specFiles.length === 0) {
        return {
          problems: [{ file: '', message: 'no spec file was written' }],
          results: [] as LiveTest[],
        };
      }
      const problems = [
        ...typecheck(checkout, setup),
        ...lintGate(checkout, e2eFiles, baseline, setup),
        ...listCheck(checkout, specFiles, browserEnv, setup),
      ];
      const results =
        live && problems.length === 0
          ? runLive(
              checkout,
              specFiles,
              browserEnv,
              path.join(runDir, `live-${round}.json`),
              setup,
            )
          : [];
      return { problems, results };
    };

    let round = 0;
    let { problems, results } = verify(round);
    const failingOf = (tests: LiveTest[]) =>
      tests.filter((t) => t.outcome === 'failed');
    while (
      (problems.length || failingOf(results).length) &&
      round < config.stages.heal.maxRounds
    ) {
      round += 1;
      currentStage = `heal-${round}`;
      const heal = config.stages.heal;
      const healed = stage<HealOutput>(
        currentStage,
        round === heal.maxRounds
          ? { ...heal, model: heal.escalationModel }
          : heal,
        {
          instructionsFile: healInstructions(stageDir, e2e.browserProject),
          prompt: healPrompt(
            problems,
            failingOf(results),
            collect().specFiles,
            e2e.browserProject,
          ),
          schema: readSchema('heal'),
          tools: ['Read', 'Grep', 'Glob', 'Write', 'Edit'],
          mcpTools: live ? HEAL_MCP_TOOLS : [],
          outputs: [],
          ...bounds,
          ...browser,
        },
      );
      if (!healed) break;
      currentStage = `verify-${round}`;
      ({ problems, results } = verify(round));
    }

    currentStage = 'finalize';
    if (problems.length) {
      throw new Error(
        `the specs still fail static checks after ${round} heal round(s):\n${problems.map((p) => p.message).join('\n')}`,
      );
    }
    const fixmeNotes = new Map<string, string>();
    failingOf(results).forEach((test) => {
      const file = path.join(checkout, test.file);
      const reason = (test.error ?? 'failed').split('\n')[0];
      const updated = markFixme(
        fs.readFileSync(file, 'utf8'),
        test.title,
        reason,
      );
      if (!updated)
        throw new Error(
          `couldn't mark "${test.title}" as fixme in ${test.file}`,
        );
      fs.writeFileSync(file, updated);
      fixmeNotes.set(test.title, reason);
    });
    if (fixmeNotes.size) {
      const after = [
        ...typecheck(checkout, setup),
        ...lintGate(checkout, collect().e2eFiles, baseline, setup),
      ];
      if (after.length)
        throw new Error(
          `marking fixmes broke the checks:\n${after.map((p) => p.message).join('\n')}`,
        );
    }

    const { files, specFiles } = collect();
    const mapped = specResults({
      specs: specFiles.map((file) => ({
        file,
        source: fs.readFileSync(path.join(checkout, file), 'utf8'),
      })),
      live: results,
      liveRan: live,
      fixmeNotes,
      specScenarioIds: specIds,
    });
    manifest = transition(manifest, 'specs-generated');
    manifest.specs = {
      files,
      tests: mapped.tests,
      missing: mapped.missing,
      healRounds: round,
      live,
      notes: generated.output.notes,
    };
    manifest = transition(manifest, 'verified');
    save();

    const bodyFile = path.join(runDir, 'ready-body.md');
    let prUrl: string | undefined;
    if (options.publish && target.pr) {
      currentStage = 'publish';
      manifest = transition(manifest, 'ready-for-review');
      writeManifest(path.join(checkout, scenariosDir), manifest);
      save();
      fs.writeFileSync(
        bodyFile,
        renderReadyBody(manifest, parsed.scenarios, e2e.browserProject),
      );
      const toCommit = changedFiles(checkout, commitExclude);
      git(['add', '--', ...toCommit], checkout);
      git(
        [
          'commit',
          '-m',
          `test(e2e): generate specs for the approved scenarios (#${target.pr.number})`,
        ],
        checkout,
      );
      // No force: if the branch moved since approval, the push fails on purpose.
      git(
        ['push', 'origin', `HEAD:refs/heads/${target.pr.headRefName}`],
        checkout,
      );
      const pr = String(target.pr.number);
      gh(['pr', 'edit', pr, '-R', config.repo, '--body-file', bodyFile]);
      gh(['pr', 'ready', pr, '-R', config.repo]);
      gh([
        'pr',
        'comment',
        pr,
        '-R',
        config.repo,
        '--body',
        `@${target.approver} — the specs for your approved scenarios are on this PR and it's ready for review.`,
      ]);
      prUrl = target.pr.url;
    } else {
      writeManifest(path.join(checkout, scenariosDir), manifest);
      fs.writeFileSync(
        bodyFile,
        renderReadyBody(manifest, parsed.scenarios, e2e.browserProject),
      );
    }

    return { manifest, scenarios: parsed.scenarios, checkout, bodyFile, prUrl };
  } catch (error) {
    manifest = fail(
      manifest,
      currentStage,
      error instanceof Error ? error.message : String(error),
    );
    save();
    throw error;
  } finally {
    server?.stop();
    // A local run's results live in the checkout; a published one is pushed.
    if (options.publish && !options.keepWork) removeCheckout(checkout);
  }
};
