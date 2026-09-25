import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { markFixme, testTitles } from './fixme';

const SPEC = `import { test, expect } from '../fixtures/test';

test.describe('RA enhancements', () => {
  test('RAE-S01 describes the RA session', async ({ page }) => {
    await expect(page.getByText('x')).toBeVisible();
  });

  test("RAE-S02 shows the RA delete confirmation ($1 cost)", async ({ page }) => {
    await expect(page.getByText('y')).toBeVisible();
  });
});
`;

describe('markFixme', () => {
  it('turns the named test into test.fixme with the reason above it', () => {
    const updated = markFixme(
      SPEC,
      'RAE-S01 describes the RA session',
      'Timeout 15000ms\n  waiting for getByText',
    );
    assert.match(
      updated ?? '',
      /  \/\/ e2e-ai: still failing after healing — Timeout 15000ms waiting for getByText\n  test\.fixme\('RAE-S01 describes the RA session', async/,
    );
    assert.equal(
      updated?.match(/test\.fixme/g)?.length,
      1,
      'touches only that test',
    );
  });

  it('handles titles with regex and replacement specials, in either quote style', () => {
    const updated = markFixme(
      SPEC,
      'RAE-S02 shows the RA delete confirmation ($1 cost)',
      'boom',
    );
    assert.match(
      updated ?? '',
      /test\.fixme\("RAE-S02 shows the RA delete confirmation \(\$1 cost\)"/,
    );
  });

  it('returns undefined for an unknown title', () => {
    assert.equal(markFixme(SPEC, 'RAE-S99 nope', 'x'), undefined);
  });
});

describe('testTitles', () => {
  it('lists tests and fixme tests, not describes', () => {
    const marked =
      markFixme(SPEC, 'RAE-S01 describes the RA session', 'x') ?? '';
    assert.deepEqual(testTitles(marked), [
      'RAE-S01 describes the RA session',
      'RAE-S02 shows the RA delete confirmation ($1 cost)',
    ]);
  });
});
