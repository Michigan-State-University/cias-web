import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import {
  createManifest,
  recordStage,
  transition,
  writeManifest,
} from './manifest';
import {
  aiScenarios,
  lineChangeRatio,
  reportRows,
  runRow,
  scenarioEdits,
} from './report';

const block = (id: string, title: string, step = 'a → b') =>
  `### ${id} — ${title}\n- automation: spec\n- priority: P0\n- covers: x\n- grounded-in: y\n- steps:\n  1. ${step}\n`;

const AI = [
  block('A-S01', 'one'),
  block('A-S02', 'two'),
  block('A-S03', 'three'),
].join('\n');

describe('scenarioEdits', () => {
  it('counts nothing changed when the developer approved as is', () => {
    assert.deepEqual(scenarioEdits(AI, AI), {
      kept: 3,
      edited: 0,
      removed: 0,
      added: 0,
      lineChangeRatio: 0,
    });
  });

  it('tells kept, edited, removed and added scenarios apart', () => {
    const human = [
      block('A-S01', 'one'),
      block('A-S02', 'two', 'a → c'),
      block('A-S04', 'four'),
    ].join('\n');
    const edits = scenarioEdits(AI, human);
    assert.deepEqual(
      {
        kept: edits.kept,
        edited: edits.edited,
        removed: edits.removed,
        added: edits.added,
      },
      { kept: 1, edited: 1, removed: 1, added: 1 },
    );
    assert.ok(edits.lineChangeRatio > 0 && edits.lineChangeRatio < 1);
  });
});

describe('lineChangeRatio', () => {
  it('is 0 for identical text and grows with the edit', () => {
    assert.equal(lineChangeRatio('a\nb\nc\nd', 'a\nb\nc\nd'), 0);
    assert.equal(
      lineChangeRatio('a\nb\nc\nd', 'a\nb\nc\nX'),
      0.5,
      'one line out, one in, over 4',
    );
  });
});

describe('aiScenarios', () => {
  it('takes the last planner stage that wrote the file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'recordings-'));
    const file = 'e2e/scenarios/pr-1/scenarios.md';
    fs.writeFileSync(
      path.join(dir, 'plan.json'),
      JSON.stringify({ files: { [file]: 'draft' } }),
    );
    fs.writeFileSync(
      path.join(dir, 'revise-1.json'),
      JSON.stringify({ files: { [file]: 'revised once' } }),
    );
    fs.writeFileSync(
      path.join(dir, 'revise-2.json'),
      JSON.stringify({ files: { [file]: 'revised twice' } }),
    );
    fs.writeFileSync(
      path.join(dir, 'review-1.json'),
      JSON.stringify({ files: {} }),
    );
    assert.equal(aiScenarios(dir, file), 'revised twice');
    assert.equal(aiScenarios(path.join(dir, 'missing'), file), undefined);
  });
});

describe('runRow', () => {
  it('summarises a run, splitting cost by stage and naming failed stages', () => {
    const stage = (
      name: string,
      cost: number,
      outcome: 'ok' | 'failed' = 'ok',
    ) => ({
      stage: name,
      model: 'm',
      outcome,
      sessionId: '',
      costUsd: cost,
      durationMs: 0,
      finishedAt: '',
    });
    let m = createManifest('pr-406', {
      kind: 'pr',
      pr: 406,
      title: 't',
      headRef: 'h',
      baseRef: 'dev',
      sha: 's',
      labels: [],
      changedFiles: [],
    });
    [
      stage('triage', 0.05),
      stage('plan', 3),
      stage('review-1', 0.5),
      stage('revise-1', 1.5),
      stage('review-2', 0.4, 'failed'),
    ].forEach((s) => {
      m = recordStage(m, s);
    });
    m = transition(transition(m, 'generated'), 'reviewed');
    m.change = { files: 15, changedLines: 180, small: false };
    m.scenarios = { total: 6, spec: 5, manual: 1, ids: [] };
    m.review = { revisions: 1, verdict: 'approved', unresolvedCorrections: [] };
    const row = runRow(m, {
      kept: 5,
      edited: 1,
      removed: 0,
      added: 0,
      lineChangeRatio: 0.08,
    });
    assert.deepEqual(row, [
      'pr-406',
      '15 files · 180 lines',
      'reviewed',
      '6 (5/1)',
      '1 · approved',
      '0',
      '—',
      '$0.05',
      '$4.50',
      '$0.90',
      '0',
      '$5.45',
      'review-2',
      '5/1/0/0 · 8%',
    ]);
  });
});

describe('reportRows', () => {
  it('counts human edits only once a run is approved', () => {
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'report-work-'));
    const recordings = fs.mkdtempSync(path.join(os.tmpdir(), 'report-rec-'));
    const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'report-repo-'));
    const file = 'e2e/scenarios/pr-1/scenarios.md';
    fs.mkdirSync(path.join(recordings, 'pr-1'));
    fs.writeFileSync(
      path.join(recordings, 'pr-1', 'plan.json'),
      JSON.stringify({ files: { [file]: AI } }),
    );
    fs.mkdirSync(path.dirname(path.join(repoRoot, file)), { recursive: true });
    fs.writeFileSync(
      path.join(repoRoot, file),
      [block('A-S01', 'one'), block('A-S02', 'two')].join('\n'),
    );
    const manifest = transition(
      transition(
        createManifest('pr-1', {
          kind: 'pr',
          pr: 1,
          title: 't',
          headRef: 'h',
          baseRef: 'dev',
          sha: 's',
          labels: [],
          changedFiles: [],
        }),
        'generated',
      ),
      'reviewed',
    );
    writeManifest(path.join(workDir, 'pr-1'), manifest);
    const options = {
      workDir,
      recordingsDir: recordings,
      repoRoot,
      scenariosDir: 'e2e/scenarios',
    };

    assert.equal(reportRows(options)[0].at(-1), 'not reviewed yet');

    writeManifest(path.join(workDir, 'pr-1'), {
      ...manifest,
      approval: { sha: 's', by: 'dev', at: '' },
    });
    assert.match(reportRows(options)[0].at(-1) ?? '', /^2\/0\/1\/0 · /);
  });
});
