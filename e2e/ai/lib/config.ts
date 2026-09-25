import fs from 'fs';
import os from 'os';
import path from 'path';

// Assumes the pipeline sits two levels below the repo root (e2e/ai here).
export const AI_DIR = path.resolve(__dirname, '..');
export const REPO_ROOT = path.resolve(AI_DIR, '../..');
export const AI_REL = path.relative(REPO_ROOT, AI_DIR);

export const pipelinePaths = {
  seed: `${AI_REL}/seed.spec.ts`,
  mcpConfig: `${AI_REL}/mcp.json`,
  eslintConfig: `${AI_REL}/eslintrc.js`,
};

export type StageConfig = {
  model: string;
  maxBudgetUsd: number;
  timeoutMinutes: number;
  effort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
};

export type SkipConfig = {
  authors: string[];
  headBranchPatterns: string[];
  labels: string[];
  behaviourPathPattern: string;
  nonBehaviourPathPatterns: string[];
};

export type E2eConfig = {
  dir: string;
  pagesDir: string;
  // The Playwright project that CI runs and specs are verified on.
  browserProject: string;
  authProject: string;
  seedProject: string;
  readOnly: string[];
  // Locators prefer it, and codegen may add it to app components.
  selectorAttribute: string;
};

export type PipelineConfig = {
  repo: string;
  baseBranch: string;
  branchPrefix: string;
  e2e: E2eConfig;
  scenariosDir: string;
  knowledgeDirs: string[];
  pairedRepo?: string;
  pairedRepoDirs?: string[];
  // Which of the paired PR's files go into paired-api.patch.
  pairedBehaviour?: Pick<
    SkipConfig,
    'behaviourPathPattern' | 'nonBehaviourPathPatterns'
  >;
  smallChange?: {
    maxFiles: number;
    maxChangedLines: number;
    stages: Partial<Record<'plan' | 'review', Partial<StageConfig>>>;
  };
  ticketPattern: string;
  skip: SkipConfig;
  maxBudgetUsdPerCommand: number;
  // Not a developer's dev server: it must serve the code under test.
  server: { port: number; startTimeoutMinutes: number };
  staleDraftDays: number;
  stages: {
    triage: StageConfig & { enabled: boolean };
    plan: StageConfig;
    review: StageConfig & { maxRevisions: number };
    codegen: StageConfig;
    // The last round escalates to escalationModel.
    heal: StageConfig & { maxRounds: number; escalationModel: string };
  };
};

export const loadConfig = (
  file = path.join(AI_DIR, 'pipeline.config.json'),
): PipelineConfig => JSON.parse(fs.readFileSync(file, 'utf8'));

// Pills live in the repo in CI and in the workspace next to it locally.
export const existingKnowledgeDirs = (config: PipelineConfig): string[] =>
  config.knowledgeDirs
    .map((dir) => path.resolve(REPO_ROOT, dir))
    .filter((dir) => fs.existsSync(dir));

// Outside the repo on purpose: Jest, tsc and ESLint would pick up a checkout.
export const workRoot = (): string =>
  process.env.E2E_AI_WORK_DIR ??
  path.join(process.env.RUNNER_TEMP ?? os.tmpdir(), 'e2e-ai');

export const isSmallChange = (
  config: PipelineConfig,
  size: { files: number; changedLines: number },
): boolean =>
  Boolean(
    config.smallChange &&
    size.files <= config.smallChange.maxFiles &&
    size.changedLines <= config.smallChange.maxChangedLines,
  );

export const stageConfigFor = <S extends 'plan' | 'review'>(
  config: PipelineConfig,
  stage: S,
  small: boolean,
): PipelineConfig['stages'][S] => ({
  ...config.stages[stage],
  ...(small ? config.smallChange?.stages[stage] : {}),
});

export const existingPairedRepoDir = (
  config: PipelineConfig,
): string | undefined =>
  (config.pairedRepoDirs ?? [])
    .map((dir) => path.resolve(REPO_ROOT, dir))
    .find((dir) => fs.existsSync(dir));
