import { execFileSync, spawnSync } from 'child_process';

const MAX_BUFFER = 64 * 1024 * 1024;

export type CommandResult = { status: number; stdout: string; stderr: string };

// For checks whose output matters most when they fail: tsc, ESLint, Playwright.
export const runResult = (
  command: string,
  args: string[],
  options: { cwd?: string; input?: string; env?: NodeJS.ProcessEnv } = {},
): CommandResult => {
  const child = spawnSync(command, args, {
    cwd: options.cwd,
    input: options.input,
    env: options.env,
    encoding: 'utf8',
    maxBuffer: MAX_BUFFER,
  });
  if (child.error) throw child.error;
  return {
    status: child.status ?? 1,
    stdout: child.stdout ?? '',
    stderr: child.stderr ?? '',
  };
};

export class CommandError extends Error {
  constructor(
    readonly command: string,
    readonly stderr: string,
  ) {
    super(
      `${command} failed: ${stderr.trim().split('\n').slice(-5).join('\n')}`,
    );
  }
}

export const run = (
  command: string,
  args: string[],
  options: { cwd?: string; input?: string } = {},
): string => {
  try {
    return execFileSync(command, args, {
      cwd: options.cwd,
      input: options.input,
      encoding: 'utf8',
      maxBuffer: MAX_BUFFER,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (error) {
    const { stderr } = error as { stderr?: string };
    throw new CommandError(
      `${command} ${args.join(' ')}`,
      stderr ?? String(error),
    );
  }
};

export const git = (args: string[], cwd?: string): string =>
  run('git', args, { cwd }).trim();

export const gh = (args: string[], cwd?: string): string =>
  run('gh', args, { cwd });

export const ghJson = <T>(args: string[], cwd?: string): T =>
  JSON.parse(gh(args, cwd)) as T;
