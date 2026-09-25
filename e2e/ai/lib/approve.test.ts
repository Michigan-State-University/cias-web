import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { checkApproval } from './approve';
import type { DraftPr } from './github';

const pr: DraftPr = {
  number: 431,
  headRefName: 'e2e-ai/pr-406',
  headRefOid: 'abc123',
  isDraft: true,
  state: 'OPEN',
  url: 'https://github.com/o/r/pull/431',
};

const check = (overrides: Partial<Parameters<typeof checkApproval>[0]> = {}) =>
  checkApproval({
    pr,
    approver: 'dev-a',
    permission: 'write',
    runState: 'awaiting-approval',
    branchPrefix: 'e2e-ai/',
    ...overrides,
  });

describe('checkApproval', () => {
  it('approves an open pipeline PR awaiting approval, by a writer', () => {
    assert.deepEqual(check(), { ok: true, runId: 'pr-406' });
    assert.equal(check({ permission: 'admin' }).ok, true);
    assert.equal(check({ permission: 'maintain' }).ok, true);
  });

  it('refuses people without write access', () => {
    assert.deepEqual(check({ permission: 'triage' }), {
      ok: false,
      reason: "dev-a can't approve: needs write access, has triage",
    });
    assert.equal(check({ permission: '' }).ok, false);
  });

  it('refuses PRs the pipeline did not open', () => {
    assert.equal(check({ pr: { ...pr, headRefName: 'feature/x' } }).ok, false);
  });

  it('refuses closed or merged PRs', () => {
    assert.equal(check({ pr: { ...pr, state: 'MERGED' } }).ok, false);
  });

  it('re-approves generated specs only after the scenarios changed', () => {
    assert.deepEqual(
      check({
        runState: 'ready-for-review',
        scenariosChangedSinceApproval: true,
      }),
      { ok: true, runId: 'pr-406' },
    );
    const unchanged = check({
      runState: 'ready-for-review',
      scenariosChangedSinceApproval: false,
    });
    assert.equal(unchanged.ok, false);
    assert.match(
      unchanged.ok ? '' : unchanged.reason,
      /edit scenarios\.md first/,
    );
  });

  it('makes a second approval a no-op', () => {
    assert.deepEqual(check({ runState: 'approved' }), {
      ok: false,
      reason: 'the run is approved, not awaiting approval',
    });
  });
});
