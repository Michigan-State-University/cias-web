// The E2E pipeline's entry point, identical locally and in CI.
// Commands and options: e2e/ai/README.md → Commands.
import fs from 'fs';
import { parseArgs } from 'util';

import { codegen } from './lib/codegen';
import { REPO_ROOT, loadConfig, workRoot } from './lib/config';
import { formatChecks, runChecks } from './lib/doctor';
import { generate } from './lib/generate';
import { checkScenarios, decline, sweep } from './lib/housekeeping';
import { latestMergedDecision } from './lib/latest';
import { regenerate } from './lib/regenerate';
import { renderReport, reportRows } from './lib/report';
import { githubOutputs, routeEvent } from './lib/router';
import type { StageMode } from './lib/runStage';

const inActions = Boolean(process.env.GITHUB_ACTIONS);

const stageMode = (values: Record<string, unknown>): StageMode => {
  if (values['dry-run']) return { kind: 'dry-run' };
  if (typeof values.replay === 'string')
    return { kind: 'replay', dir: values.replay };
  if (typeof values.record === 'string')
    return { kind: 'record', dir: values.record };
  return { kind: 'live' };
};

const generateCommand = (argv: string[]) => {
  const { values } = parseArgs({
    args: argv,
    options: {
      pr: { type: 'string' },
      branch: { type: 'string' },
      base: { type: 'string' },
      ticket: { type: 'string' },
      'dry-run': { type: 'boolean' },
      record: { type: 'string' },
      replay: { type: 'string' },
      publish: { type: 'boolean' },
      'keep-work': { type: 'boolean' },
      'no-triage': { type: 'boolean' },
      'hide-own-e2e': { type: 'boolean' },
    },
  });
  if (!values.pr === !values.branch)
    throw new Error(
      'generate needs exactly one of --pr <number> or --branch <name>',
    );

  const result = generate(
    {
      pr: values.pr ? Number(values.pr) : undefined,
      branch: values.branch,
      base: values.base,
      ticket: values.ticket,
      mode: stageMode(values),
      publish: Boolean(values.publish),
      keepWork: Boolean(values['keep-work']),
      modelTriage: !values['no-triage'],
      hideOwnE2e: Boolean(values['hide-own-e2e']),
    },
    loadConfig(),
  );

  const { manifest } = result;
  if (result.stoppedBefore) return;
  if (manifest.state === 'skipped') {
    console.log(`Skipped ${manifest.id}: ${manifest.triage?.reason}`);
    return;
  }
  const s = manifest.scenarios;
  console.log(
    `\n${manifest.id}: ${s?.total} scenarios (${s?.spec} spec, ${s?.manual} manual) · ${manifest.review?.revisions} revision(s) · $${manifest.totalCostUsd.toFixed(2)}`,
  );
  if (manifest.decisions.length)
    console.log(
      `${manifest.decisions.length} decision(s) taken without asking — listed at the top of scenarios.md`,
    );
  if (result.scenariosDir) console.log(`Scenarios: ${result.scenariosDir}`);
  if (result.prBodyFile) console.log(`PR body:   ${result.prBodyFile}`);
  if (result.prUrl) console.log(`Draft PR:  ${result.prUrl}`);
};

const specsCommand = async (argv: string[], approving: boolean) => {
  const { values } = parseArgs({
    args: argv,
    options: {
      pr: { type: 'string' },
      run: { type: 'string' },
      by: { type: 'string' },
      base: { type: 'string' },
      'no-live': { type: 'boolean' },
      'dry-run': { type: 'boolean' },
      record: { type: 'string' },
      replay: { type: 'string' },
      'keep-work': { type: 'boolean' },
    },
  });
  if (approving && !values.pr)
    throw new Error('approve needs --pr <draft PR number>');
  if (!approving && !values.run)
    throw new Error('codegen needs --run <run id>, e.g. pr-412');

  const result = await codegen(
    {
      pr: approving ? Number(values.pr) : undefined,
      runId: approving ? undefined : values.run,
      approver: values.by,
      baseRef: values.base,
      mode: stageMode(values),
      publish: approving,
      keepWork: Boolean(values['keep-work']),
      live: !values['no-live'],
    },
    loadConfig(),
  );
  if (result.stoppedBefore) return;

  const specs = result.manifest.specs;
  const count = (status: string) =>
    specs?.tests.filter((t) => t.status === status).length ?? 0;
  console.log(
    `\n${result.manifest.id}: ${specs?.tests.length} tests — ${count('passed')} passed ×2, ${count('fixme')} fixme, ${count('not-run')} not run live · ${specs?.healRounds} heal round(s) · $${result.manifest.totalCostUsd.toFixed(2)} total`,
  );
  if (specs?.missing.length)
    console.log(`No test for: ${specs.missing.join(', ')}`);
  if (result.prUrl) console.log(`Ready for review: ${result.prUrl}`);
  else
    console.log(
      `Results (uncommitted): ${result.checkout}\n  git -C ${result.checkout} status`,
    );
  if (result.bodyFile) console.log(`PR body:   ${result.bodyFile}`);
};

const draftCommand = (argv: string[], command: string) => {
  const { values } = parseArgs({
    args: argv,
    options: {
      pr: { type: 'string' },
      by: { type: 'string' },
      notes: { type: 'string' },
      'dry-run': { type: 'boolean' },
    },
  });
  const pr = Number(values.pr);
  if (!Number.isInteger(pr) || pr <= 0)
    throw new Error(`${command} needs --pr <draft PR number>`);
  const config = loadConfig();
  const by = values.by ?? '';
  if (command !== 'check-scenarios' && !by)
    throw new Error(`${command} needs --by <login>`);

  if (command === 'decline') {
    console.log(`Declined ${decline(pr, by, config)}`);
  } else if (command === 'check-scenarios') {
    console.log(
      checkScenarios(pr, config)
        ? `Warned on #${pr}: approved scenarios changed`
        : `#${pr}: nothing to flag`,
    );
  } else {
    const result = regenerate({
      pr,
      notes: values.notes ?? '',
      by,
      mode: stageMode(values),
      config,
    });
    console.log(
      `Redrafted ${result.prUrl ?? `#${pr}`}: ${result.manifest.scenarios?.total} scenarios`,
    );
  }
};

const routeCommand = (argv: string[]) => {
  const { values } = parseArgs({
    args: argv,
    options: {
      'event-name': { type: 'string' },
      'event-path': { type: 'string' },
    },
  });
  const config = loadConfig();
  const payload = JSON.parse(
    fs.readFileSync(values['event-path'] ?? '', 'utf8'),
  );
  const eventName = values['event-name'] ?? '';
  // TEMPORARY: the push trigger in e2e-ai.yml (see lib/latest.ts).
  const decision =
    eventName === 'push'
      ? latestMergedDecision(config, payload.head_commit?.message ?? '')
      : routeEvent(eventName, payload, {
          baseBranch: config.baseBranch,
          branchPrefix: config.branchPrefix,
          autoEnabled: process.env.E2E_AI_AUTO === 'on',
        });
  console.log(JSON.stringify(decision));

  // Comment text is untrusted: later jobs read it only via env vars.
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, githubOutputs(decision));
  }
};

const reportCommand = (argv: string[]) => {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: { recordings: { type: 'string' } },
  });
  const config = loadConfig();
  console.log(
    renderReport(
      reportRows({
        workDir: workRoot(),
        recordingsDir: values.recordings,
        repoRoot: REPO_ROOT,
        scenariosDir: config.scenariosDir,
        ids: positionals,
      }),
    ),
  );
};

const main = async () => {
  const [command, ...argv] = process.argv.slice(2);
  if (command === 'generate') return generateCommand(argv);
  if (command === 'approve') return specsCommand(argv, true);
  if (command === 'codegen') return specsCommand(argv, false);
  if (['regenerate', 'decline', 'check-scenarios'].includes(command))
    return draftCommand(argv, command);
  if (command === 'sweep') {
    const closed = sweep(loadConfig());
    return console.log(
      closed.length
        ? `Closed stale drafts: ${closed.map((n) => `#${n}`).join(', ')}`
        : 'No stale drafts',
    );
  }
  if (command === 'doctor') {
    const checks = await runChecks(loadConfig());
    console.log(formatChecks(checks));
    if (checks.some((c) => c.status === 'fail')) process.exitCode = 1;
    return undefined;
  }
  if (command === 'route') return routeCommand(argv);
  if (command === 'report') return reportCommand(argv);
  throw new Error(
    `unknown command "${command ?? ''}" — see e2e/ai/README.md → Commands`,
  );
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  // In Actions, annotate but never fail the job: the pipeline only proposes.
  if (inActions) {
    console.log(`::error title=E2E pipeline::${message}`);
  } else {
    console.error(`e2e:ai: ${message}`);
    process.exitCode = 1;
  }
});
