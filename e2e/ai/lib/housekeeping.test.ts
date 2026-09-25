import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { noticeMarker, scenariosNotice, staleDrafts } from './housekeeping';
import { createManifest } from './manifest';

const manifest = (approved: boolean) => {
  const m = createManifest('pr-406', {
    kind: 'pr',
    pr: 406,
    title: 't',
    headRef: 'CIAS30-4188-ra',
    baseRef: 'dev',
    sha: 'abc',
    labels: [],
    changedFiles: [],
  });
  if (approved) m.approval = { sha: 'def4567890', by: 'dev-a', at: '' };
  return m;
};

describe('scenariosNotice', () => {
  it('stays quiet before approval — editing then is the normal flow', () => {
    assert.equal(
      scenariosNotice({
        manifest: manifest(false),
        changed: true,
        comments: [],
      }),
      undefined,
    );
  });

  it('stays quiet when the approved scenarios are unchanged', () => {
    assert.equal(
      scenariosNotice({
        manifest: manifest(true),
        changed: false,
        comments: [],
      }),
      undefined,
    );
  });

  it('warns once when they changed after approval, naming the approver', () => {
    const notice = scenariosNotice({
      manifest: manifest(true),
      changed: true,
      comments: [],
    });
    assert.match(
      notice ?? '',
      /changed after @dev-a approved them at `def4567`/,
    );
    assert.match(notice ?? '', /Comment `\/e2e approve` to regenerate/);
    assert.equal(
      scenariosNotice({
        manifest: manifest(true),
        changed: true,
        comments: [`${notice}`],
      }),
      undefined,
      'not twice for the same approval',
    );
  });

  it('warns again after a later approval', () => {
    const old = `${noticeMarker('0000000')} earlier notice`;
    assert.ok(
      scenariosNotice({
        manifest: manifest(true),
        changed: true,
        comments: [old],
      }),
    );
  });
});

describe('staleDrafts', () => {
  const config = { branchPrefix: 'e2e-ai/', staleDraftDays: 14 };
  const now = new Date('2026-10-20T12:00:00Z');
  const pr = (
    number: number,
    headRefName: string,
    createdAt: string,
    isDraft = true,
  ) => ({
    number,
    headRefName,
    isDraft,
    createdAt,
  });

  it('closes only pipeline drafts older than the limit', () => {
    const stale = staleDrafts(
      [
        pr(1, 'e2e-ai/pr-400', '2026-10-01T12:00:00Z'),
        pr(2, 'e2e-ai/pr-401', '2026-10-10T12:00:00Z'),
        pr(3, 'feature/x', '2026-09-01T12:00:00Z'),
        pr(4, 'e2e-ai/pr-402', '2026-09-01T12:00:00Z', false),
      ],
      config,
      now,
    );
    assert.deepEqual(
      stale.map((p) => p.number),
      [1],
      'not too young, not someone else’s PR, not one already ready for review',
    );
  });
});
