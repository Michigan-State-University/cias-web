import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import {
  buildClaudeArgs,
  checkClaude,
  claudeBin,
  runStage,
  stageEnv,
  StageError,
  type StageRequest,
} from './runStage';

const request = (
  cwd: string,
  overrides: Partial<StageRequest> = {},
): StageRequest => ({
  name: 'plan',
  model: 'claude-opus-5',
  maxBudgetUsd: 5,
  timeoutMinutes: 30,
  instructionsFile: '/ai/prompts/plan.md',
  prompt: 'Draft E2E scenarios.',
  schema: { type: 'object' },
  cwd,
  tools: ['Read', 'Grep', 'Write'],
  readDirs: ['/work/input', '/pills'],
  writeRoots: ['e2e/scenarios/pr-1'],
  outputs: ['e2e/scenarios/pr-1/scenarios.md'],
  ...overrides,
});

const flagValue = (args: string[], flag: string) =>
  args[args.indexOf(flag) + 1];

describe('buildClaudeArgs', () => {
  it('runs --restricted — never --bare, which skips the guard hook', () => {
    const args = buildClaudeArgs(request('/c'), '/s.json');
    assert.ok(args.includes('--restricted'));
    assert.ok(!args.includes('--bare'));
  });

  it('pre-approves exactly the stage tools and denies the rest', () => {
    const args = buildClaudeArgs(request('/c'), '/s.json');
    assert.equal(flagValue(args, '--tools'), 'Read,Grep,Write');
    assert.equal(flagValue(args, '--allowedTools'), 'Read,Grep,Write');
    assert.equal(flagValue(args, '--permission-mode'), 'dontAsk');
  });

  it('isolates the stage and caps its spend', () => {
    const args = buildClaudeArgs(request('/c'), '/s.json');
    ['--strict-mcp-config', '--no-session-persistence', '-p'].forEach((flag) =>
      assert.ok(args.includes(flag), flag),
    );
    assert.equal(flagValue(args, '--max-budget-usd'), '5');
    assert.equal(flagValue(args, '--settings'), '/s.json');
    assert.deepEqual(
      args.flatMap((arg, i) => (arg === '--add-dir' ? [args[i + 1]] : [])),
      ['/work/input', '/pills'],
    );
  });

  it('never puts the prompt on the command line (it goes on stdin)', () => {
    assert.ok(
      !buildClaudeArgs(request('/c'), '/s.json').includes(
        'Draft E2E scenarios.',
      ),
    );
  });

  it('adds MCP config and effort only when set', () => {
    const plain = buildClaudeArgs(request('/c'), '/s.json');
    assert.ok(!plain.includes('--mcp-config') && !plain.includes('--effort'));
    const full = buildClaudeArgs(
      request('/c', { mcpConfig: '/m.json', effort: 'high' }),
      '/s.json',
    );
    assert.equal(flagValue(full, '--mcp-config'), '/m.json');
    assert.equal(flagValue(full, '--effort'), 'high');
  });
});

describe('runStage replay', () => {
  const withDirs = (fn: (cwd: string, recordings: string) => void) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'run-stage-'));
    const cwd = path.join(root, 'checkout');
    const recordings = path.join(root, 'recordings');
    fs.mkdirSync(cwd);
    fs.mkdirSync(recordings);
    try {
      fn(cwd, recordings);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  };

  it('restores recorded files and returns the recorded output', () => {
    withDirs((cwd, recordings) => {
      fs.writeFileSync(
        path.join(recordings, 'plan.json'),
        JSON.stringify({
          result: {
            structured_output: { ok: true },
            session_id: 's1',
            total_cost_usd: 1.5,
            duration_ms: 900,
            num_turns: 7,
          },
          files: { 'e2e/scenarios/pr-1/scenarios.md': '### A-S01 — x\n' },
        }),
      );
      const result = runStage<{ ok: boolean }>(
        request(cwd),
        { kind: 'replay', dir: recordings },
        path.join(cwd, '..', 'stages'),
      );
      assert.deepEqual(result, {
        output: { ok: true },
        sessionId: 's1',
        costUsd: 1.5,
        durationMs: 900,
        numTurns: 7,
      });
      assert.equal(
        fs.readFileSync(
          path.join(cwd, 'e2e/scenarios/pr-1/scenarios.md'),
          'utf8',
        ),
        '### A-S01 — x\n',
      );
    });
  });

  it('turns an error result into a StageError', () => {
    withDirs((cwd, recordings) => {
      fs.writeFileSync(
        path.join(recordings, 'plan.json'),
        JSON.stringify({
          result: {
            is_error: true,
            terminal_reason: 'error_max_budget_usd',
            result: 'budget',
          },
          files: {},
        }),
      );
      assert.throws(
        () =>
          runStage(
            request(cwd),
            { kind: 'replay', dir: recordings },
            path.join(cwd, '..', 'stages'),
          ),
        (error: unknown) =>
          error instanceof StageError &&
          /error_max_budget_usd/.test(error.message),
      );
    });
  });

  it('fails clearly when a recording is missing', () => {
    withDirs((cwd, recordings) => {
      assert.throws(
        () => runStage(request(cwd), { kind: 'replay', dir: recordings }, cwd),
        /no recording at/,
      );
    });
  });
});

describe('checkClaude', () => {
  const fakeClaude = (help: string, version: string) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fake-claude-'));
    const bin = path.join(dir, 'claude');
    fs.writeFileSync(
      bin,
      `#!/bin/sh\nif [ "$1" = "--version" ]; then echo "${version}"; else echo "${help}"; fi\n`,
    );
    fs.chmodSync(bin, 0o755);
    return bin;
  };

  it('accepts a CLI with every flag the stages use', () => {
    const bin = fakeClaude(
      '--restricted --bare --json-schema --strict-mcp-config --tools --max-budget-usd --no-session-persistence',
      '2.1.282 (Claude Code)',
    );
    assert.doesNotThrow(() => checkClaude(bin));
  });

  it('names the version and the missing flags of a stale CLI', () => {
    const bin = fakeClaude(
      '--bare --json-schema --tools',
      '2.1.215 (Claude Code)',
    );
    assert.throws(
      () => checkClaude(bin),
      /\(2\.1\.215 \(Claude Code\)\) lacks --restricted, --strict-mcp-config, --max-budget-usd, --no-session-persistence — update Claude Code, or set E2E_AI_CLAUDE_BIN/,
    );
  });

  it('explains a missing CLI', () => {
    assert.throws(
      () => checkClaude('/nonexistent/claude'),
      /cannot run \/nonexistent\/claude/,
    );
  });

  it('honours E2E_AI_CLAUDE_BIN', () => {
    assert.equal(
      claudeBin({ E2E_AI_CLAUDE_BIN: '/opt/homebrew/bin/claude' }),
      '/opt/homebrew/bin/claude',
    );
    assert.equal(claudeBin({}), 'claude');
  });
});

describe('stage timeout', () => {
  it('kills a stage that ignores SIGTERM once its timeout passes', () => {
    // A fake `claude` that passes the flag check, then hangs, deaf to SIGTERM.
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hung-claude-'));
    const bin = path.join(dir, 'claude');
    fs.writeFileSync(
      bin,
      [
        '#!/bin/sh',
        'if [ "$1" = "--help" ]; then',
        '  echo "--restricted --bare --json-schema --strict-mcp-config --tools --max-budget-usd --no-session-persistence"',
        '  exit 0',
        'fi',
        "trap '' TERM",
        'exec sleep 30',
        '',
      ].join('\n'),
    );
    fs.chmodSync(bin, 0o755);
    const previous = process.env.E2E_AI_CLAUDE_BIN;
    process.env.E2E_AI_CLAUDE_BIN = bin;
    const started = Date.now();
    try {
      assert.throws(
        () =>
          runStage(
            request(dir, { timeoutMinutes: 0.01 }),
            { kind: 'live' },
            path.join(dir, 'stages'),
          ),
        (error: unknown) =>
          error instanceof StageError &&
          /no result within 0\.01 min \(timeoutMinutes\); killed/.test(
            error.message,
          ),
      );
    } finally {
      if (previous === undefined) delete process.env.E2E_AI_CLAUDE_BIN;
      else process.env.E2E_AI_CLAUDE_BIN = previous;
    }
    assert.ok(Date.now() - started < 10_000, 'did not wait for the sleep');
  });
});

describe('browser stages', () => {
  it('pre-approves the listed MCP tools without widening the built-in tools', () => {
    const args = buildClaudeArgs(
      request('/c', {
        mcpConfig: '/m.json',
        mcpTools: [
          'mcp__playwright-test__browser_snapshot',
          'mcp__playwright-test__test_run',
        ],
      }),
      '/s.json',
    );
    assert.equal(flagValue(args, '--tools'), 'Read,Grep,Write');
    assert.equal(
      flagValue(args, '--allowedTools'),
      'Read,Grep,Write,mcp__playwright-test__browser_snapshot,mcp__playwright-test__test_run',
    );
  });

  const base = {
    GH_TOKEN: 'gh',
    E2E_AI_APP_TOKEN: 'app',
    E2E_ADMIN_PASSWORD: 'pw',
    E2E_VERIFICATION_CODE: '123',
    PATH: '/bin',
  };

  it('withholds GitHub tokens from every stage, E2E credentials unless asked', () => {
    const plain = stageEnv(request('/c'), base);
    [
      'GH_TOKEN',
      'E2E_AI_APP_TOKEN',
      'E2E_ADMIN_PASSWORD',
      'E2E_VERIFICATION_CODE',
    ].forEach((key) => assert.equal(plain[key], undefined, key));
    assert.equal(plain.PATH, '/bin');

    const browser = stageEnv(
      request('/c', { keepE2eCredentials: true, env: { E2E_AI: '1' } }),
      base,
    );
    assert.equal(browser.GH_TOKEN, undefined);
    assert.equal(browser.E2E_ADMIN_PASSWORD, 'pw');
    assert.equal(browser.E2E_AI, '1');
  });

  it('keeps the Claude credential that is set and drops an empty one', () => {
    // An unset GitHub secret arrives as "": it mustn't shadow the token.
    const env = stageEnv(request('/c'), {
      ANTHROPIC_API_KEY: '',
      CLAUDE_CODE_OAUTH_TOKEN: 'oauth-token',
    });
    assert.equal('ANTHROPIC_API_KEY' in env, false);
    assert.equal(env.CLAUDE_CODE_OAUTH_TOKEN, 'oauth-token');
  });

  it('hands the guard its roots', () => {
    const env = stageEnv(
      request('/c', {
        writeRoots: ['e2e'],
        denyRoots: ['e2e/fixtures', 'e2e/ai'],
      }),
      {},
    );
    assert.equal(env.E2E_AI_ROOT, '/c');
    assert.equal(env.E2E_AI_WRITE_ROOTS, 'e2e');
    assert.equal(env.E2E_AI_DENY_ROOTS, 'e2e/fixtures:e2e/ai');
  });
});
