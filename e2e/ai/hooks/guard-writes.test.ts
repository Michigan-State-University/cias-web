import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, it } from 'node:test';

const HOOK = path.join(__dirname, 'guard-writes.js');
const ROOT = '/repo';

// Runs the hook exactly as Claude Code does: the tool call as JSON on stdin.
const call = (toolName: string, toolInput: object, writeRoots = 'e2e') =>
  spawnSync('node', [HOOK], {
    input: JSON.stringify({ tool_name: toolName, tool_input: toolInput }),
    env: { ...process.env, E2E_AI_ROOT: ROOT, E2E_AI_WRITE_ROOTS: writeRoots },
    encoding: 'utf8',
  });

describe('guard-writes hook', () => {
  it('allows a clean write inside the stage roots', () => {
    const result = call('Write', {
      file_path: '/repo/e2e/sessions/ra.spec.ts',
      content: 'await expect(x).toBeVisible();',
    });
    assert.equal(result.status, 0);
  });

  it('blocks writes outside the stage roots, relative or absolute', () => {
    const outside = call('Write', {
      file_path: '/repo/app/index.tsx',
      content: 'x',
    });
    assert.equal(outside.status, 2);
    assert.match(
      outside.stderr,
      /app\/index\.tsx is outside what this stage may write \(e2e\)/,
    );
    assert.equal(
      call('Write', { file_path: '/elsewhere/x.ts', content: 'x' }).status,
      2,
    );
  });

  it('does not treat a sibling with the same prefix as inside', () => {
    assert.equal(
      call('Write', { file_path: '/repo/e2e-other/x.ts', content: 'x' }).status,
      2,
    );
  });

  it('blocks everything when the stage may write nothing', () => {
    assert.equal(
      call('Write', { file_path: '/repo/e2e/x.ts', content: 'x' }, '').status,
      2,
    );
  });

  it('blocks forbidden waits in e2e code via Write, Edit and MultiEdit', () => {
    const file = '/repo/e2e/pages/SessionPage.ts';
    assert.equal(
      call('Write', {
        file_path: file,
        content: 'await page.waitForTimeout(500);',
      }).status,
      2,
    );
    assert.equal(
      call('Edit', {
        file_path: file,
        old_string: 'a',
        new_string: "await page.waitForLoadState('networkidle');",
      }).status,
      2,
    );
    const multi = call('MultiEdit', {
      file_path: file,
      edits: [
        { old_string: 'a', new_string: 'await b.click({ force: true });' },
      ],
    });
    assert.equal(multi.status, 2);
    assert.match(multi.stderr, /\{ force: true \}/);
  });

  it('judges only the new text, so an edit next to existing debt is fine', () => {
    const edit = call('Edit', {
      file_path: '/repo/e2e/pages/SessionPage.ts',
      old_string: 'await page.waitForTimeout(500);',
      new_string: 'await expect(x).toBeVisible();',
    });
    assert.equal(edit.status, 0);
  });

  it('leaves non-code files alone', () => {
    const doc = call('Write', {
      file_path: '/repo/e2e/scenarios/pr-1/scenarios.md',
      content: 'never use waitForTimeout( in specs',
    });
    assert.equal(doc.status, 0);
  });

  it('allows several roots', () => {
    const result = call(
      'Write',
      { file_path: '/repo/app/components/X/index.tsx', content: 'x' },
      'e2e:app/components/X/index.tsx',
    );
    assert.equal(result.status, 0);
  });
});

describe('guard-writes hook — deny roots', () => {
  const callWithDeny = (file: string, deny: string) =>
    spawnSync('node', [HOOK], {
      input: JSON.stringify({
        tool_name: 'Write',
        tool_input: { file_path: file, content: 'x' },
      }),
      env: {
        ...process.env,
        E2E_AI_ROOT: ROOT,
        E2E_AI_WRITE_ROOTS: 'e2e',
        E2E_AI_DENY_ROOTS: deny,
      },
      encoding: 'utf8',
    });

  const deny =
    'e2e/fixtures:e2e/ai:e2e/scenarios:e2e/sessions/ra-session.spec.ts';

  it('blocks a denied path even inside an allowed root', () => {
    const result = callWithDeny('/repo/e2e/fixtures/test.ts', deny);
    assert.equal(result.status, 2);
    assert.match(
      result.stderr,
      /e2e\/fixtures\/test\.ts is off-limits to this stage \(e2e\/fixtures\)/,
    );
  });

  it('protects individual existing specs and the approved scenarios', () => {
    assert.equal(
      callWithDeny('/repo/e2e/sessions/ra-session.spec.ts', deny).status,
      2,
    );
    assert.equal(
      callWithDeny('/repo/e2e/scenarios/pr-406/scenarios.md', deny).status,
      2,
    );
  });

  it('still allows new files next to them', () => {
    assert.equal(
      callWithDeny('/repo/e2e/sessions/ra-enhancements.spec.ts', deny).status,
      0,
    );
    assert.equal(
      callWithDeny('/repo/e2e/pages/TextMessagesPage.ts', deny).status,
      0,
    );
  });
});
