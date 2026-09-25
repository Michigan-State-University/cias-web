import fs from 'fs';
import path from 'path';

import { loadConfig, pipelinePaths, type PipelineConfig } from './config';
import { git, runResult } from './shell';

// Deterministic checks on generated specs: the model's word that a spec works is never taken.

export type Problem = { file: string; message: string };

export type LiveTest = {
  file: string;
  title: string;
  line: number;
  outcome: 'passed' | 'failed' | 'skipped';
  error?: string;
};

export type VerifySetup = {
  e2eDir: string;
  project: string;
  eslintConfig: string;
};

export const verifySetup = (config: PipelineConfig): VerifySetup => ({
  e2eDir: config.e2e.dir,
  project: config.e2e.browserProject,
  eslintConfig: pipelinePaths.eslintConfig,
});

const defaultSetup = () => verifySetup(loadConfig());

const bin = (cwd: string, name: string) =>
  path.join(cwd, 'node_modules', '.bin', name);

const stripAnsi = (text: string) => text.replace(/\u001b\[[0-9;]*m/g, '');

export const typecheck = (
  cwd: string,
  setup: VerifySetup = defaultSetup(),
): Problem[] => {
  const result = runResult(
    bin(cwd, 'tsc'),
    ['-p', `${setup.e2eDir}/tsconfig.json`, '--pretty', 'false'],
    { cwd },
  );
  return result.stdout
    .split('\n')
    .map((line) => line.match(/^(.+?)\(\d+,\d+\): error (TS\d+: .*)$/))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map(([whole, file]) => ({ file, message: whole }));
};

type EslintMessage = {
  ruleId: string | null;
  severity: number;
  line: number;
  message: string;
};
type EslintFileResult = { filePath: string; messages: EslintMessage[] };

const lintErrors = (
  cwd: string,
  setup: VerifySetup,
  file: string,
  content?: string,
): EslintMessage[] => {
  const base = [
    '--no-eslintrc',
    '--no-ignore',
    '-c',
    setup.eslintConfig,
    '-f',
    'json',
  ];
  const args =
    content === undefined
      ? [...base, file]
      : [...base, '--stdin', '--stdin-filename', file];
  const result = runResult(bin(cwd, 'eslint'), args, { cwd, input: content });
  const [report] = JSON.parse(result.stdout || '[]') as EslintFileResult[];
  return (report?.messages ?? []).filter((m) => m.severity === 2);
};

const countByRule = (messages: EslintMessage[]) =>
  messages.reduce<Record<string, number>>((counts, { ruleId }) => {
    const rule = ruleId ?? 'parse';
    return { ...counts, [rule]: (counts[rule] ?? 0) + 1 };
  }, {});

// A file's content before codegen touched it; undefined for a new file.
export type Baseline = (file: string) => string | undefined;

export const gitBaseline =
  (cwd: string, baseSha: string): Baseline =>
  (file) => {
    try {
      return git(['show', `${baseSha}:${file}`], cwd);
    } catch {
      return undefined;
    }
  };

// Existing files may keep their lint debt but not add to it (per rule); new files must be clean.
export const lintGate = (
  cwd: string,
  files: string[],
  baseline: Baseline,
  setup: VerifySetup = defaultSetup(),
): Problem[] =>
  files
    .filter((file) => /\.[cm]?[jt]s$/.test(file))
    .flatMap((file) => {
      const now = lintErrors(cwd, setup, file);
      const before = baseline(file);
      const base =
        before === undefined
          ? {}
          : countByRule(lintErrors(cwd, setup, file, before));
      const current = countByRule(now);
      return Object.entries(current)
        .filter(([rule, count]) => count > (base[rule] ?? 0))
        .map(([rule, count]) => {
          const lines = now
            .filter((m) => (m.ruleId ?? 'parse') === rule)
            .map((m) => m.line);
          const was = base[rule] ? ` (was ${base[rule]})` : '';
          const sample =
            now.find((m) => (m.ruleId ?? 'parse') === rule)?.message ?? '';
          return {
            file,
            message: `${file}: ${count} × ${rule}${was} at line ${lines.join(', ')} — ${sample}`,
          };
        });
    });

export const listCheck = (
  cwd: string,
  specFiles: string[],
  env: NodeJS.ProcessEnv,
  setup: VerifySetup = defaultSetup(),
): Problem[] => {
  const result = runResult(
    bin(cwd, 'playwright'),
    ['test', '--list', `--project=${setup.project}`, ...specFiles],
    { cwd, env },
  );
  const total = Number(result.stdout.match(/Total: (\d+) tests?/)?.[1] ?? 0);
  if (result.status === 0 && total > 0) return [];
  const why = (result.stderr || result.stdout)
    .trim()
    .split('\n')
    .slice(-6)
    .join('\n');
  return [
    { file: specFiles.join(', '), message: `playwright --list failed: ${why}` },
  ];
};

type ReportSpec = {
  title: string;
  file: string;
  line: number;
  tests: {
    status: string;
    results: { status: string; error?: { message?: string } }[];
  }[];
};
type ReportSuite = { specs?: ReportSpec[]; suites?: ReportSuite[] };

const specsOf = (suite: ReportSuite): ReportSpec[] => [
  ...(suite.specs ?? []),
  ...(suite.suites ?? []).flatMap(specsOf),
];

// With --repeat-each the report lists a spec once per repeat; it passes only if all did.
export const parseReport = (
  report: { suites?: ReportSuite[] },
  testDir = 'e2e',
): LiveTest[] => {
  const byTest = new Map<string, ReportSpec[]>();
  (report.suites ?? []).flatMap(specsOf).forEach((spec) => {
    const key = `${spec.file}\u0000${spec.title}`;
    byTest.set(key, [...(byTest.get(key) ?? []), spec]);
  });

  return [...byTest.values()].map((runs) => {
    const statuses = runs.flatMap((run) => run.tests.map((t) => t.status));
    const failedResult = runs
      .flatMap((run) => run.tests.flatMap((t) => t.results))
      .find(
        (result) => result.status !== 'passed' && result.status !== 'skipped',
      );
    const outcome = statuses.every((s) => s === 'skipped')
      ? 'skipped'
      : statuses.every((s) => s === 'expected')
        ? 'passed'
        : 'failed';
    const error = failedResult?.error?.message
      ? stripAnsi(failedResult.error.message)
          .split('\n')
          .slice(0, 6)
          .join('\n')
          .trim()
      : undefined;
    return {
      file: path.posix.join(testDir, runs[0].file),
      title: runs[0].title,
      line: runs[0].line,
      outcome,
      ...(outcome === 'failed'
        ? { error: error ?? `status ${statuses.join(', ')}` }
        : {}),
    };
  });
};

// Twice each as a flake check, as the pipeline's own account (E2E_AI=1 in env).
export const runLive = (
  cwd: string,
  specFiles: string[],
  env: NodeJS.ProcessEnv,
  reportFile: string,
  setup: VerifySetup = defaultSetup(),
): LiveTest[] => {
  fs.rmSync(reportFile, { force: true });
  runResult(
    bin(cwd, 'playwright'),
    [
      'test',
      `--project=${setup.project}`,
      '--repeat-each=2',
      '--reporter=json',
      ...specFiles,
    ],
    { cwd, env: { ...env, PLAYWRIGHT_JSON_OUTPUT_NAME: reportFile } },
  );
  if (!fs.existsSync(reportFile)) {
    return specFiles.map((file) => ({
      file,
      title: '(whole file)',
      line: 0,
      outcome: 'failed',
      error: 'Playwright produced no report — the run crashed before any test',
    }));
  }
  return parseReport(
    JSON.parse(fs.readFileSync(reportFile, 'utf8')),
    setup.e2eDir,
  );
};
