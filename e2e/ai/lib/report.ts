import fs from 'fs';
import path from 'path';

import { MANIFEST_FILE, readManifest, type RunManifest } from './manifest';
import { parseScenarios, type Scenario } from './scenarios';

// How runs went, what they cost, and how much a developer edited the scenarios before approving.

export type ScenarioEdits = {
  kept: number;
  edited: number;
  removed: number;
  added: number;
  // Lines removed from the AI's version plus lines added, over its length.
  lineChangeRatio: number;
};

const lines = (text: string) => text.split('\n').map((line) => line.trimEnd());

const lcsLength = (a: string[], b: string[]): number => {
  let previous = new Array<number>(b.length + 1).fill(0);
  a.forEach((lineA) => {
    const current = new Array<number>(b.length + 1).fill(0);
    b.forEach((lineB, j) => {
      current[j + 1] =
        lineA === lineB
          ? previous[j] + 1
          : Math.max(previous[j + 1], current[j]);
    });
    previous = current;
  });
  return previous[b.length];
};

export const lineChangeRatio = (ai: string, human: string): number => {
  const a = lines(ai);
  const b = lines(human);
  const common = lcsLength(a, b);
  return a.length === 0
    ? 0
    : (a.length - common + (b.length - common)) / a.length;
};

const fingerprint = (s: Scenario) =>
  JSON.stringify([
    s.title,
    s.automation,
    s.manualReason,
    s.priority,
    s.preconditions,
    s.steps,
  ]);

export const scenarioEdits = (ai: string, human: string): ScenarioEdits => {
  const before = new Map(parseScenarios(ai).scenarios.map((s) => [s.id, s]));
  const after = new Map(parseScenarios(human).scenarios.map((s) => [s.id, s]));
  const ids = [...before.keys()];
  return {
    kept: ids.filter(
      (id) =>
        after.has(id) &&
        fingerprint(after.get(id)!) === fingerprint(before.get(id)!),
    ).length,
    edited: ids.filter(
      (id) =>
        after.has(id) &&
        fingerprint(after.get(id)!) !== fingerprint(before.get(id)!),
    ).length,
    removed: ids.filter((id) => !after.has(id)).length,
    added: [...after.keys()].filter((id) => !before.has(id)).length,
    lineChangeRatio: lineChangeRatio(ai, human),
  };
};

type Recording = { files?: Record<string, string> };

export const aiScenarios = (
  recordingDir: string,
  scenariosFile: string,
): string | undefined => {
  if (!fs.existsSync(recordingDir)) return undefined;
  const stages = fs
    .readdirSync(recordingDir)
    .filter((file) => /^(plan|revise-\d+)\.json$/.test(file))
    .sort((a, b) => {
      const n = (file: string) =>
        file === 'plan.json' ? 0 : Number(file.match(/\d+/)?.[0]);
      return n(b) - n(a);
    });
  for (const stage of stages) {
    const recording: Recording = JSON.parse(
      fs.readFileSync(path.join(recordingDir, stage), 'utf8'),
    );
    const text = recording.files?.[scenariosFile];
    if (text !== undefined) return text;
  }
  return undefined;
};

const money = (usd: number) => `$${usd.toFixed(2)}`;

// Older runs recorded open questions instead of decisions.
const decisionCount = (manifest: RunManifest): string => {
  const legacy = (manifest as { openQuestions?: unknown[] }).openQuestions;
  if (manifest.decisions) return String(manifest.decisions.length);
  return legacy ? `${legacy.length} Qs` : '0';
};

export const runRow = (
  manifest: RunManifest,
  edits?: ScenarioEdits,
): string[] => {
  const s = manifest.scenarios;
  const byStage = (prefix: string) =>
    manifest.stages
      .filter(
        (stage) =>
          stage.stage === prefix || stage.stage.startsWith(`${prefix}-`),
      )
      .reduce((sum, stage) => sum + stage.costUsd, 0);
  const failed = manifest.stages
    .filter((stage) => stage.outcome === 'failed')
    .map((stage) => stage.stage);
  const { change } = manifest;
  const turns = manifest.stages.reduce(
    (sum, stage) => sum + (stage.numTurns ?? 0),
    0,
  );
  return [
    manifest.id,
    change
      ? `${change.files} files · ${change.changedLines} lines${change.small ? ' · small' : ''}`
      : '—',
    manifest.state + (manifest.error ? ` (${manifest.error.stage})` : ''),
    s ? `${s.total} (${s.spec}/${s.manual})` : '—',
    manifest.review
      ? `${manifest.review.revisions} · ${manifest.review.verdict}`
      : '—',
    decisionCount(manifest),
    manifest.grounding
      ? `${manifest.grounding.issuesFound} found · ${manifest.grounding.issuesLeft} left`
      : '—',
    money(byStage('triage')),
    money(byStage('plan') + byStage('revise')),
    money(byStage('review')),
    String(turns),
    money(manifest.totalCostUsd),
    failed.length ? failed.join(', ') : '—',
    edits
      ? `${edits.kept}/${edits.edited}/${edits.removed}/${edits.added} · ${Math.round(edits.lineChangeRatio * 100)}%`
      : 'not reviewed yet',
  ];
};

export const REPORT_HEADER = [
  'Run',
  'Change',
  'State',
  'Scenarios (spec/manual)',
  'Revisions · verdict',
  'Decisions',
  'Grounding issues',
  'Triage',
  'Planner',
  'Reviewer',
  'Turns',
  'Total',
  'Failed stages',
  'Human edits kept/edited/removed/added · lines',
];

export const renderReport = (rows: string[][]): string =>
  [
    `| ${REPORT_HEADER.join(' | ')} |`,
    `|${REPORT_HEADER.map(() => '---').join('|')}|`,
    ...rows.map((row) => `| ${row.join(' | ')} |`),
  ].join('\n');

// Human edits are counted only once a run is approved: the AI's last draft vs the repo's scenarios.
export const reportRows = (options: {
  workDir: string;
  recordingsDir?: string;
  repoRoot: string;
  scenariosDir: string;
  ids?: string[];
}): string[][] => {
  const ids =
    options.ids && options.ids.length > 0
      ? options.ids
      : fs
          .readdirSync(options.workDir)
          .filter((id) =>
            fs.existsSync(path.join(options.workDir, id, MANIFEST_FILE)),
          )
          .sort();
  return ids.map((id) => {
    const manifest = readManifest(path.join(options.workDir, id));
    const file = `${options.scenariosDir}/${id}/scenarios.md`;
    const ai = options.recordingsDir
      ? aiScenarios(path.join(options.recordingsDir, id), file)
      : undefined;
    const human = path.join(options.repoRoot, file);
    const edits =
      manifest.approval && ai !== undefined && fs.existsSync(human)
        ? scenarioEdits(ai, fs.readFileSync(human, 'utf8'))
        : undefined;
    return runRow(manifest, edits);
  });
};
