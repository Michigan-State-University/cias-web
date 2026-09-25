import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';

import { REPO_ROOT } from './config';
import { lintGate, parseReport } from './verify';

// Playwright's JSON report with --repeat-each=2 lists each spec once per repeat.
const spec = (
  title: string,
  line: number,
  status: string,
  result: string,
  message?: string,
) => ({
  title,
  file: 'sessions/ra-enhancements.spec.ts',
  line,
  tests: [
    {
      status,
      results: [{ status: result, ...(message ? { error: { message } } : {}) }],
    },
  ],
});

const report = {
  suites: [
    {
      file: 'sessions/ra-enhancements.spec.ts',
      suites: [
        {
          specs: [
            spec('RAE-S01 passes', 5, 'expected', 'passed'),
            spec('RAE-S02 flakes', 9, 'expected', 'passed'),
            spec('RAE-S03 is fixme', 13, 'skipped', 'skipped'),
            spec('RAE-S01 passes', 5, 'expected', 'passed'),
            spec(
              'RAE-S02 flakes',
              9,
              'unexpected',
              'failed',
              '\u001b[31mError: Timeout 15000ms exceeded\u001b[39m\n  waiting for getByText("Alert")',
            ),
            spec('RAE-S03 is fixme', 13, 'skipped', 'skipped'),
          ],
        },
      ],
    },
  ],
};

describe('parseReport', () => {
  const tests = parseReport(report);

  it('folds the repeats of each test into one result', () => {
    assert.equal(tests.length, 3);
    assert.deepEqual(
      tests.map(({ title, outcome }) => [title, outcome]),
      [
        ['RAE-S01 passes', 'passed'],
        ['RAE-S02 flakes', 'failed'],
        ['RAE-S03 is fixme', 'skipped'],
      ],
    );
  });

  it('fails a test that passed only one of its two repeats (a flake)', () => {
    const flaky = tests.find((t) => t.title === 'RAE-S02 flakes');
    assert.equal(flaky?.outcome, 'failed');
    assert.equal(
      flaky?.error,
      'Error: Timeout 15000ms exceeded\n  waiting for getByText("Alert")',
    );
  });

  it('reports repo-relative paths', () => {
    assert.equal(tests[0].file, 'e2e/sessions/ra-enhancements.spec.ts');
  });
});

describe('lintGate', () => {
  // A probe inside e2e/: the type-aware parser lints only e2e/tsconfig.json files.
  const file = 'e2e/ai/__lint-gate-probe.spec.ts';
  const withFile = (content: string, fn: () => void) => {
    fs.writeFileSync(path.join(REPO_ROOT, file), content);
    try {
      fn();
    } finally {
      fs.rmSync(path.join(REPO_ROOT, file), { force: true });
    }
  };
  const specWithSleeps = (sleeps: number) =>
    [
      "import { test, expect } from '../fixtures/test';",
      '',
      "test('X-S01 probe', async ({ page }) => {",
      ...Array.from(
        { length: sleeps },
        () => '  await page.waitForTimeout(100);',
      ),
      "  await expect(page.getByText('x')).toBeVisible();",
      '});',
      '',
    ].join('\n');

  it('holds a new file to zero errors', () => {
    withFile(specWithSleeps(1), () => {
      const problems = lintGate(REPO_ROOT, [file], () => undefined);
      assert.equal(problems.length, 1);
      assert.match(
        problems[0].message,
        /1 × playwright\/no-wait-for-timeout at line 4/,
      );
    });
  });

  it('tolerates an edited file’s existing debt, but not new debt', () => {
    withFile(specWithSleeps(2), () => {
      assert.deepEqual(
        lintGate(REPO_ROOT, [file], () => specWithSleeps(2)),
        [],
      );
      const grown = lintGate(REPO_ROOT, [file], () => specWithSleeps(1));
      assert.match(
        grown[0].message,
        /2 × playwright\/no-wait-for-timeout \(was 1\)/,
      );
    });
  });
});
