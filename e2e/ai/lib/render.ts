import type { RunManifest, SpecTest } from './manifest';
import type { Scenario } from './scenarios';

// The PR body is rendered from run.json and scenarios.md, never hand-edited, so it can't drift.

export const PR_BODY_MARKER = '<!-- e2e-ai:pr-body -->';

const cell = (text: string) => text.replace(/\|/g, '\\|').replace(/\n/g, ' ');

const sourceLine = (manifest: RunManifest): string => {
  const { source } = manifest;
  const change = source.url
    ? `[#${source.pr}](${source.url})`
    : `\`${source.headRef}\``;
  const ticket = source.ticket ? ` · ${source.ticket}` : '';
  const author = source.author ? ` by @${source.author}` : '';
  return `Scenarios for ${change} — ${cell(source.title)}${author}${ticket}.`;
};

const scenarioTable = (scenarios: Scenario[]): string[] => [
  '| ID | Scenario | Priority | Automation |',
  '|---|---|---|---|',
  ...scenarios.map(
    (s) =>
      `| ${s.id} | ${cell(s.title)} | ${s.priority} | ${
        s.automation === 'spec'
          ? 'spec'
          : `manual — ${cell(s.manualReason ?? '')}`
      } |`,
  ),
];

const decisions = (manifest: RunManifest): string[] =>
  manifest.decisions.length === 0
    ? []
    : [
        '### Decisions made for you',
        '',
        "Where the pills and code didn't settle something, the pipeline didn't stop to ask: it took the option it " +
          'recommends and wrote the scenarios to follow it. Disagree? Change the decision and the scenarios it affects ' +
          'in `scenarios.md` (`## Decisions` at the top) before approving.',
        '',
        ...manifest.decisions.map(
          (d) =>
            `- **${cell(d.question)}** → ${cell(d.chosen)}. ${cell(d.reason)}${
              d.options.length > 1
                ? ` _Alternatives: ${d.options
                    .filter((option) => option !== d.chosen)
                    .map(cell)
                    .join(' / ')}._`
                : ''
            }`,
        ),
        '',
      ];

const unresolved = (manifest: RunManifest): string[] => {
  const corrections = manifest.review?.unresolvedCorrections ?? [];
  return corrections.length === 0
    ? []
    : [
        '### Reviewer findings not applied',
        '',
        `The reviewer still flagged these after ${manifest.review?.revisions} revision round(s):`,
        '',
        ...corrections.map((c) => `- ${cell(c)}`),
        '',
      ];
};

const stageTable = (manifest: RunManifest): string[] => [
  '| Stage | Model | Cost | Time |',
  '|---|---|---|---|',
  ...manifest.stages.map(
    (s) =>
      `| ${s.stage}${s.outcome === 'failed' ? ' (failed)' : ''} | ${s.model} | $${s.costUsd.toFixed(2)} | ${Math.round(s.durationMs / 1000)}s |`,
  ),
  `| **total** | | **$${manifest.totalCostUsd.toFixed(2)}** | |`,
];

export const renderPrBody = (
  manifest: RunManifest,
  scenarios: Scenario[],
): string => {
  const spec = scenarios.filter((s) => s.automation === 'spec').length;
  return [
    PR_BODY_MARKER,
    `## 🧪 E2E scenarios — awaiting review`,
    '',
    sourceLine(manifest),
    '',
    `**${scenarios.length} scenarios**: ${spec} will become Playwright specs, ${scenarios.length - spec} stay manual. ` +
      `Full text: \`e2e/scenarios/${manifest.id}/scenarios.md\`.`,
    '',
    ...scenarioTable(scenarios),
    '',
    ...decisions(manifest),
    ...unresolved(manifest),
    '### What to do',
    '',
    '1. Review the scenarios. Edit `scenarios.md` in this PR directly (commit or suggestion) — keep the `### ID — title` headers and `- key:` lines.',
    '2. Comment **`/e2e approve`** to generate the specs onto this PR. Nothing merges until you merge it.',
    '',
    'Other commands: `/e2e regenerate <notes>` redrafts with your notes · `/e2e decline` closes this PR. Unapproved drafts close after 14 days.',
    '',
    '<details><summary>Run details</summary>',
    '',
    `Run \`${manifest.id}\` · state \`${manifest.state}\` · commit \`${manifest.source.sha.slice(0, 7)}\``,
    '',
    ...stageTable(manifest),
    '',
    `Pills read: ${manifest.knowledge.pillsRead.map((p) => `\`${p.split('/').pop()}\``).join(', ') || 'none'}`,
    '',
    '</details>',
    '',
  ].join('\n');
};

const RESULT: Record<SpecTest['status'], string> = {
  passed: '✅ passed ×2',
  fixme: '⏸ fixme',
  'not-run': '⚠️ not run live',
};

export const renderReadyBody = (
  manifest: RunManifest,
  scenarios: Scenario[],
  project = 'webkit',
): string => {
  const specs = manifest.specs;
  const tests = specs?.tests ?? [];
  const byScenario = (id: string) => tests.filter((t) => t.scenarioId === id);
  const firstSpec = tests[0]?.file ?? 'e2e/<area>/<feature>.spec.ts';
  const passed = tests.filter((t) => t.status === 'passed').length;
  const fixme = tests.filter((t) => t.status === 'fixme').length;

  return [
    PR_BODY_MARKER,
    '## 🧪 E2E specs — ready for review',
    '',
    sourceLine(manifest),
    manifest.approval
      ? `Scenarios approved by @${manifest.approval.by} at \`${manifest.approval.sha.slice(0, 7)}\`.`
      : '',
    '',
    `**${tests.length} tests**: ${passed} passed twice live, ${fixme} committed as \`test.fixme\`` +
      `${specs?.live === false ? ' — **not run live** (static checks only)' : ''}` +
      `${specs?.healRounds ? ` · ${specs.healRounds} heal round(s)` : ''}.`,
    '',
    '| Scenario | Test | Result |',
    '|---|---|---|',
    ...scenarios.map((s) => {
      if (s.automation === 'manual')
        return `| ${s.id} | — | manual — ${cell(s.manualReason ?? '')} |`;
      const found = byScenario(s.id);
      if (found.length === 0) return `| ${s.id} | — | ❌ no test generated |`;
      return found
        .map(
          (t) =>
            `| ${s.id} | \`${t.file.split('/').pop()}\` › ${cell(t.title)} | ${RESULT[t.status]}${t.note ? ` — ${cell(t.note)}` : ''} |`,
        )
        .join('\n');
    }),
    '',
    '### Files',
    '',
    ...(specs?.files ?? []).map((file) => `- \`${file}\``),
    '',
    ...(specs?.notes ? ['### Notes from codegen', '', specs.notes, ''] : []),
    '### Try it locally',
    '',
    '```bash',
    `git fetch origin && git checkout e2e-ai/${manifest.id}`,
    'npm run e2e:setup        # once, with your local .env E2E credentials',
    `npx playwright test ${firstSpec} --project=${project} --headed`,
    '```',
    '',
    'Review these like any PR — push fixes to this branch if needed — and merge when happy. `e2e-tests.yml` runs on every push.',
    '',
    '<details><summary>Run details</summary>',
    '',
    `Run \`${manifest.id}\` · state \`${manifest.state}\``,
    '',
    ...stageTable(manifest),
    '',
    '</details>',
    '',
  ]
    .filter((line, i, all) => !(line === '' && all[i - 1] === ''))
    .join('\n');
};
