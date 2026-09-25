import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { AI_DIR } from './config';

// Every AI stage is a separate headless `claude -p` run; stages hand over only through files.

export type StageMode =
  | { kind: 'live' }
  | { kind: 'dry-run' }
  | { kind: 'record'; dir: string }
  | { kind: 'replay'; dir: string };

export type StageRequest = {
  name: string;
  model: string;
  maxBudgetUsd: number;
  timeoutMinutes: number;
  effort?: string;
  instructionsFile: string;
  prompt: string;
  schema: object;
  cwd: string;
  tools: string[];
  readDirs: string[];
  // Relative to cwd, enforced by hooks/guard-writes.js; denyRoots wins over them.
  writeRoots: string[];
  denyRoots?: string[];
  outputs: string[];
  mcpConfig?: string;
  // Any other MCP tool is denied: some write files and would bypass the write guard.
  mcpTools?: string[];
  env?: Record<string, string>;
  keepE2eCredentials?: boolean;
};

export type StageUsage = {
  sessionId: string;
  costUsd: number;
  durationMs: number;
  numTurns?: number;
};

export type StageResult<T> = StageUsage & { output: T };

export class StageError extends Error {
  constructor(
    readonly stage: string,
    message: string,
    readonly usage?: StageUsage,
  ) {
    super(`stage ${stage}: ${message}`);
  }
}

export const SECRET_FILE_RULES = [
  'Read(./.env)',
  'Read(./.env.*)',
  'Read(**/.env)',
  'Read(**/.env.*)',
];

// Never visible to a stage: GitHub writes are the orchestrator's job.
const GITHUB_SECRETS = ['GH_TOKEN', 'GITHUB_TOKEN', 'E2E_AI_APP_TOKEN'];
// Empty ones are dropped: an unset GitHub secret arrives as "" and would shadow a set token.
const CLAUDE_CREDENTIALS = ['ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN'];
const E2E_SECRETS = [
  'E2E_ADMIN_PASSWORD',
  'E2E_VERIFICATION_CODE',
  'ADDITIONAL_ORIGIN_SECURE_TOKEN',
];

type ClaudeJson = {
  is_error?: boolean;
  subtype?: string;
  result?: string;
  structured_output?: unknown;
  session_id?: string;
  total_cost_usd?: number;
  duration_ms?: number;
  num_turns?: number;
  terminal_reason?: string;
};

type Recording = { result: ClaudeJson; files: Record<string, string> };

// Checked up front: a stale `claude` on PATH would otherwise fail mid-run with "unknown option".
const REQUIRED_FLAGS = [
  '--restricted',
  '--bare',
  '--json-schema',
  '--strict-mcp-config',
  '--tools',
  '--max-budget-usd',
  '--no-session-persistence',
];

export const claudeBin = (env: NodeJS.ProcessEnv = process.env): string =>
  env.E2E_AI_CLAUDE_BIN ?? 'claude';

const checkedBins = new Set<string>();

export const checkClaude = (bin = claudeBin()): void => {
  if (checkedBins.has(bin)) return;
  const help = spawnSync(bin, ['--help'], { encoding: 'utf8' });
  if (help.error) {
    throw new Error(
      `cannot run ${bin} (${help.error.message}) — install Claude Code or set E2E_AI_CLAUDE_BIN`,
    );
  }
  const missing = REQUIRED_FLAGS.filter((flag) => !help.stdout.includes(flag));
  if (missing.length > 0) {
    const version = spawnSync(bin, ['--version'], { encoding: 'utf8' });
    throw new Error(
      `${bin} (${version.stdout.trim() || 'unknown version'}) lacks ${missing.join(', ')} — update Claude Code, or set E2E_AI_CLAUDE_BIN to a newer one`,
    );
  }
  checkedBins.add(bin);
};

export const buildClaudeArgs = (
  request: StageRequest,
  settingsFile: string,
): string[] => {
  const args = [
    '-p',
    '--output-format',
    'json',
    '--model',
    request.model,
    '--json-schema',
    JSON.stringify(request.schema),
    '--append-system-prompt-file',
    request.instructionsFile,
    '--tools',
    request.tools.join(','),
    '--allowedTools',
    [...request.tools, ...(request.mcpTools ?? [])].join(','),
    // Browser stages run next to the developer's .env, so no stage may read it.
    '--disallowedTools',
    SECRET_FILE_RULES.join(','),
    '--permission-mode',
    'dontAsk',
    '--settings',
    settingsFile,
    '--strict-mcp-config',
    '--no-session-persistence',
    '--max-budget-usd',
    String(request.maxBudgetUsd),
    // Still applies --settings (the write guard). Never --bare: it skips settings
    // hooks, so the write guard would silently vanish, and it can't use a login.
    '--restricted',
  ];
  request.readDirs.forEach((dir) => args.push('--add-dir', dir));
  if (request.mcpConfig) args.push('--mcp-config', request.mcpConfig);
  if (request.effort) args.push('--effort', request.effort);
  return args;
};

const guardSettings = () => ({
  hooks: {
    PreToolUse: [
      {
        matcher: 'Write|Edit|MultiEdit',
        hooks: [
          {
            type: 'command',
            command: `node ${JSON.stringify(path.join(AI_DIR, 'hooks', 'guard-writes.js'))}`,
          },
        ],
      },
    ],
  },
});

export const stageEnv = (
  request: StageRequest,
  base: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv => {
  const env: NodeJS.ProcessEnv = { ...base, ...request.env };
  GITHUB_SECRETS.forEach((key) => delete env[key]);
  CLAUDE_CREDENTIALS.filter((key) => !env[key]).forEach(
    (key) => delete env[key],
  );
  if (!request.keepE2eCredentials)
    E2E_SECRETS.forEach((key) => delete env[key]);
  env.E2E_AI_ROOT = request.cwd;
  env.E2E_AI_WRITE_ROOTS = request.writeRoots.join(':');
  env.E2E_AI_DENY_ROOTS = (request.denyRoots ?? []).join(':');
  return env;
};

const usageOf = (json: ClaudeJson): StageUsage => ({
  sessionId: json.session_id ?? '',
  costUsd: json.total_cost_usd ?? 0,
  durationMs: json.duration_ms ?? 0,
  numTurns: json.num_turns,
});

const toResult = <T>(
  request: StageRequest,
  json: ClaudeJson,
): StageResult<T> => {
  if (json.is_error || json.structured_output === undefined) {
    const why = json.terminal_reason ?? json.subtype ?? 'no structured output';
    const detail = String(json.result ?? '').slice(0, 500);
    throw new StageError(
      request.name,
      detail ? `${why}: ${detail}` : why,
      usageOf(json),
    );
  }
  return { output: json.structured_output as T, ...usageOf(json) };
};

const replay = <T>(request: StageRequest, dir: string): StageResult<T> => {
  const file = path.join(dir, `${request.name}.json`);
  if (!fs.existsSync(file))
    throw new StageError(request.name, `no recording at ${file}`);
  const recording: Recording = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.entries(recording.files).forEach(([relative, content]) => {
    const target = path.join(request.cwd, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  });
  return toResult<T>(request, recording.result);
};

const record = (
  request: StageRequest,
  dir: string,
  result: ClaudeJson,
): void => {
  const files = Object.fromEntries(
    request.outputs
      .filter((relative) => fs.existsSync(path.join(request.cwd, relative)))
      .map((relative) => [
        relative,
        fs.readFileSync(path.join(request.cwd, relative), 'utf8'),
      ]),
  );
  fs.mkdirSync(dir, { recursive: true });
  const recording: Recording = { result, files };
  fs.writeFileSync(
    path.join(dir, `${request.name}.json`),
    `${JSON.stringify(recording, null, 2)}\n`,
  );
};

export const runStage = <T>(
  request: StageRequest,
  mode: StageMode,
  stageDir: string,
): StageResult<T> | undefined => {
  if (mode.kind === 'replay') return replay<T>(request, mode.dir);

  const bin = claudeBin();
  checkClaude(bin);
  fs.mkdirSync(stageDir, { recursive: true });
  const settingsFile = path.join(stageDir, `${request.name}.settings.json`);
  fs.writeFileSync(settingsFile, JSON.stringify(guardSettings(), null, 2));
  const args = buildClaudeArgs(request, settingsFile);

  if (mode.kind === 'dry-run') {
    const promptFile = path.join(stageDir, `${request.name}.prompt.md`);
    fs.writeFileSync(promptFile, request.prompt);
    const shown = args.map((arg) =>
      arg.startsWith('{') ? "'<json schema>'" : arg,
    );
    console.log(`\n[dry-run] ${request.name} (cwd ${request.cwd})`);
    console.log(`  ${bin} ${shown.join(' ')} < ${promptFile}`);
    console.log(`  instructions: ${request.instructionsFile}`);
    console.log(`  may write: ${request.writeRoots.join(', ') || 'nothing'}`);
    return undefined;
  }

  const child = spawnSync(bin, args, {
    cwd: request.cwd,
    env: stageEnv(request),
    input: request.prompt,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    timeout: request.timeoutMinutes * 60_000,
    // A stuck claude ignores SIGTERM, and spawnSync would wait for it forever.
    killSignal: 'SIGKILL',
  });
  if (child.error) {
    const timedOut =
      (child.error as NodeJS.ErrnoException).code === 'ETIMEDOUT';
    throw new StageError(
      request.name,
      timedOut
        ? `no result within ${request.timeoutMinutes} min (timeoutMinutes); killed`
        : child.error.message,
    );
  }

  let json: ClaudeJson;
  try {
    json = JSON.parse(child.stdout);
  } catch {
    const stderr = (child.stderr ?? '').trim().split('\n').slice(-5).join('\n');
    throw new StageError(
      request.name,
      `claude exited ${child.status} without JSON output: ${stderr}`,
    );
  }

  if (mode.kind === 'record') record(request, mode.dir, json);
  return toResult<T>(request, json);
};
