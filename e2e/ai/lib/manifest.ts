import fs from 'fs';
import path from 'path';

// run.json is the one record of a run, committed next to the scenarios.

export type RunState =
  | 'started'
  | 'skipped'
  | 'generated'
  | 'reviewed'
  | 'awaiting-approval'
  | 'approved'
  | 'specs-generated'
  | 'verified'
  | 'ready-for-review'
  | 'merged'
  | 'declined'
  | 'failed';

const TRANSITIONS: Record<RunState, RunState[]> = {
  started: ['skipped', 'generated', 'failed'],
  generated: ['reviewed', 'failed'],
  reviewed: ['awaiting-approval', 'failed'],
  'awaiting-approval': ['approved', 'generated', 'declined', 'failed'],
  approved: ['specs-generated', 'failed'],
  'specs-generated': ['verified', 'failed'],
  verified: ['ready-for-review', 'failed'],
  'ready-for-review': ['merged', 'approved', 'declined'],
  skipped: [],
  merged: [],
  declined: [],
  failed: ['started'],
};

// A judgement call the stage made unasked; the developer can overturn it.
export type Decision = {
  question: string;
  options: string[];
  chosen: string;
  reason: string;
};

export type StageRecord = {
  stage: string;
  model: string;
  outcome: 'ok' | 'failed';
  sessionId: string;
  costUsd: number;
  durationMs: number;
  numTurns?: number;
  finishedAt: string;
};

export type SourceChange = {
  kind: 'pr' | 'branch';
  pr?: number;
  title: string;
  url?: string;
  author?: string;
  headRef: string;
  baseRef: string;
  // The merge commit for a merged PR, the branch head otherwise.
  sha: string;
  ticket?: string;
  labels: string[];
  changedFiles: string[];
};

export type PairedChange = {
  repo: string;
  prs: { number: number; title: string; state: string; url: string }[];
};

export type SpecTest = {
  scenarioId: string;
  file: string;
  title: string;
  // passed means green on both live runs; not-run means static checks only.
  status: 'passed' | 'fixme' | 'not-run';
  note?: string;
};

export type SpecsResult = {
  // Includes data-cy additions in app files, not just specs.
  files: string[];
  tests: SpecTest[];
  missing: string[];
  healRounds: number;
  live: boolean;
  notes: string;
};

export type RunManifest = {
  schemaVersion: 1;
  id: string;
  state: RunState;
  source: SourceChange;
  paired?: PairedChange;
  triage?: { skip: boolean; reason: string; by: 'rules' | 'model' };
  knowledge: {
    dirs: string[];
    pillsRead: string[];
    pairedSource?: { ref: string; sha: string };
  };
  change?: { files: number; changedLines: number; small: boolean };
  scenarios?: { total: number; spec: number; manual: number; ids: string[] };
  // issuesFound is from the first draft, issuesLeft after revisions.
  grounding?: {
    checked: number;
    issuesFound: number;
    issuesLeft: number;
    hints: number;
  };
  review?: {
    revisions: number;
    verdict: 'approved' | 'needs_revision';
    unresolvedCorrections: string[];
  };
  decisions: Decision[];
  approval?: { sha: string; by: string; at: string };
  specs?: SpecsResult;
  stages: StageRecord[];
  totalCostUsd: number;
  error?: { stage: string; message: string; at: string };
  createdAt: string;
  updatedAt: string;
};

export const MANIFEST_FILE = 'run.json';

export const createManifest = (
  id: string,
  source: SourceChange,
  now = new Date(),
): RunManifest => ({
  schemaVersion: 1,
  id,
  state: 'started',
  source,
  knowledge: { dirs: [], pillsRead: [] },
  decisions: [],
  stages: [],
  totalCostUsd: 0,
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
});

export const canTransition = (from: RunState, to: RunState): boolean =>
  TRANSITIONS[from].includes(to);

export const transition = (
  manifest: RunManifest,
  to: RunState,
  now = new Date(),
): RunManifest => {
  if (!canTransition(manifest.state, to)) {
    throw new Error(
      `run ${manifest.id}: cannot go from ${manifest.state} to ${to}`,
    );
  }
  return { ...manifest, state: to, updatedAt: now.toISOString() };
};

export const recordStage = (
  manifest: RunManifest,
  record: StageRecord,
): RunManifest => ({
  ...manifest,
  stages: [...manifest.stages, record],
  totalCostUsd: Number((manifest.totalCostUsd + record.costUsd).toFixed(4)),
});

export const fail = (
  manifest: RunManifest,
  stage: string,
  message: string,
  now = new Date(),
): RunManifest => ({
  ...manifest,
  state: 'failed',
  error: { stage, message, at: now.toISOString() },
  updatedAt: now.toISOString(),
});

export const readManifest = (dir: string): RunManifest =>
  JSON.parse(fs.readFileSync(path.join(dir, MANIFEST_FILE), 'utf8'));

export const writeManifest = (dir: string, manifest: RunManifest): void => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, MANIFEST_FILE),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
};
