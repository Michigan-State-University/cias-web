import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import {
  canTransition,
  createManifest,
  fail,
  readManifest,
  recordStage,
  transition,
  writeManifest,
  type SourceChange,
} from './manifest';

const source: SourceChange = {
  kind: 'pr',
  pr: 412,
  title: 'RA sessions minor enhancements',
  headRef: 'CIAS30-4188-ra',
  baseRef: 'dev',
  sha: 'abc1234def',
  labels: [],
  changedFiles: ['app/x.tsx'],
};
const now = new Date('2026-09-25T10:00:00Z');

describe('run manifest', () => {
  it('walks the happy path', () => {
    const states = [
      'generated',
      'reviewed',
      'awaiting-approval',
      'approved',
      'specs-generated',
      'verified',
      'ready-for-review',
      'merged',
    ] as const;
    const end = states.reduce(
      (m, state) => transition(m, state, now),
      createManifest('pr-412', source, now),
    );
    assert.equal(end.state, 'merged');
  });

  it('refuses illegal transitions', () => {
    const m = createManifest('pr-412', source, now);
    assert.equal(canTransition('started', 'approved'), false);
    assert.throws(
      () => transition(m, 'approved'),
      /cannot go from started to approved/,
    );
  });

  it('lets a regenerate go back from awaiting-approval, and a failed run restart', () => {
    assert.equal(canTransition('awaiting-approval', 'generated'), true);
    assert.equal(canTransition('failed', 'started'), true);
  });

  it('adds up stage costs', () => {
    const stage = {
      stage: 'plan',
      model: 'm',
      outcome: 'ok' as const,
      sessionId: 's',
      costUsd: 1.23456,
      durationMs: 1,
      finishedAt: '',
    };
    const m = recordStage(
      recordStage(createManifest('pr-412', source, now), stage),
      { ...stage, costUsd: 0.1 },
    );
    assert.equal(m.stages.length, 2);
    assert.equal(m.totalCostUsd, 1.3346);
  });

  it('records failures with the stage', () => {
    const m = fail(
      createManifest('pr-412', source, now),
      'review-1',
      'boom',
      now,
    );
    assert.equal(m.state, 'failed');
    assert.deepEqual(m.error, {
      stage: 'review-1',
      message: 'boom',
      at: now.toISOString(),
    });
  });

  it('round-trips through run.json', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-'));
    const m = createManifest('pr-412', source, now);
    writeManifest(dir, m);
    assert.deepEqual(readManifest(dir), m);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
