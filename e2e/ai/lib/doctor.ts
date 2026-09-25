import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import {
  REPO_ROOT,
  existingKnowledgeDirs,
  type PipelineConfig,
} from './config';
import { buildPillsIndex } from './pills';
import { checkClaude, claudeBin } from './runStage';
import { portInUse } from './server';
import { runResult } from './shell';

// Readiness checks only: no model calls, and never print a secret's value.

export type Check = {
  name: string;
  status: 'ok' | 'warn' | 'fail';
  detail: string;
};

export const REQUIRED_CREDENTIALS = [
  'E2E_ADMIN_PASSWORD',
  'E2E_VERIFICATION_CODE',
];

export const missingCredentials = (
  env: NodeJS.ProcessEnv,
  dotenvKeys: string[],
): string[] =>
  REQUIRED_CREDENTIALS.filter((key) => !env[key] && !dotenvKeys.includes(key));

const tail = (text: string) => text.trim().split('\n').pop() ?? '';

const claudeCheck = (): Check => {
  const bin = claudeBin();
  try {
    checkClaude(bin);
    const version = runResult(bin, ['--version']).stdout.trim();
    return {
      name: 'Claude Code CLI',
      status: 'ok',
      detail: `${bin} — ${version}`,
    };
  } catch (error) {
    return {
      name: 'Claude Code CLI',
      status: 'fail',
      detail: (error as Error).message,
    };
  }
};

const ghCheck = (): Check => {
  try {
    const result = runResult('gh', ['auth', 'status']);
    return result.status === 0
      ? { name: 'GitHub CLI', status: 'ok', detail: 'signed in' }
      : {
          name: 'GitHub CLI',
          status: 'fail',
          detail: tail(result.stderr || result.stdout),
        };
  } catch {
    return {
      name: 'GitHub CLI',
      status: 'fail',
      detail: 'gh is not installed',
    };
  }
};

const dotenvKeys = (): string[] => {
  try {
    return Object.keys(
      dotenv.parse(fs.readFileSync(path.join(REPO_ROOT, '.env'))),
    );
  } catch {
    return [];
  }
};

export const runChecks = async (config: PipelineConfig): Promise<Check[]> => {
  const node = Number(process.versions.node.split('.')[0]);
  const pills = buildPillsIndex(existingKnowledgeDirs(config)).length;
  const missing = missingCredentials(process.env, dotenvKeys());
  const portBusy = await portInUse(config.server.port);

  return [
    {
      name: 'Node.js',
      status: node === 22 ? 'ok' : 'warn',
      detail: `${process.version} (the repo pins 22.x)`,
    },
    claudeCheck(),
    ghCheck(),
    pills > 0
      ? {
          name: 'Knowledge pills',
          status: 'ok',
          detail: `${pills} pills found`,
        }
      : {
          name: 'Knowledge pills',
          status: 'warn',
          detail: `none in ${config.knowledgeDirs.join(', ')} — the planner will work from the diff and code only`,
        },
    missing.length === 0
      ? {
          name: 'E2E credentials',
          status: 'ok',
          detail: `${REQUIRED_CREDENTIALS.join(', ')} set`,
        }
      : {
          name: 'E2E credentials',
          status: 'warn',
          detail: `${missing.join(', ')} not set (environment or .env) — needed for live codegen, not for generate`,
        },
    portBusy
      ? {
          name: 'App port',
          status: 'warn',
          detail: `${config.server.port} is in use — stop that server before a live codegen run`,
        }
      : {
          name: 'App port',
          status: 'ok',
          detail: `${config.server.port} is free`,
        },
  ];
};

const ICON: Record<Check['status'], string> = {
  ok: '✅',
  warn: '⚠️ ',
  fail: '❌',
};

export const formatChecks = (checks: Check[]): string =>
  [
    ...checks.map((c) => `${ICON[c.status]} ${c.name.padEnd(16)} ${c.detail}`),
    '',
    checks.some((c) => c.status === 'fail')
      ? 'Not ready: fix the ❌ items first.'
      : 'Ready. Live codegen also needs the pipeline’s own staging account (see README → Setup).',
  ].join('\n');
