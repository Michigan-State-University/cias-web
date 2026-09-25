import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createManifest, recordStage } from './manifest';
import { PR_BODY_MARKER, renderPrBody, renderReadyBody } from './render';
import type { Scenario } from './scenarios';

const scenario = (
  id: string,
  automation: 'spec' | 'manual',
  manualReason?: string,
): Scenario => ({
  id,
  title: `Title with a | pipe for ${id}`,
  automation,
  manualReason,
  priority: 'P0',
  covers: '',
  groundedIn: '',
  preconditions: '',
  steps: ['a → b'],
  pageObjects: '',
});

const manifest = () => {
  const m = recordStage(
    createManifest('pr-412', {
      kind: 'pr',
      pr: 412,
      title: 'RA sessions minor enhancements',
      url: 'https://github.com/o/r/pull/412',
      author: 'dev-a',
      headRef: 'CIAS30-4188-ra',
      baseRef: 'dev',
      sha: 'abc1234def',
      ticket: 'CIAS30-4188',
      labels: [],
      changedFiles: [],
    }),
    {
      stage: 'plan',
      model: 'claude-opus-5',
      outcome: 'ok',
      sessionId: 's',
      costUsd: 1.5,
      durationMs: 61_000,
      finishedAt: '',
    },
  );
  m.knowledge.pillsRead = ['/pills/cias-web/tlfb-calendar-redux-subsystem.md'];
  m.decisions = [
    {
      question: 'Should RA be hidden?',
      options: ['yes', 'no'],
      chosen: 'yes',
      reason: 'The pill says RA is admin-only.',
    },
  ];
  m.review = {
    revisions: 2,
    verdict: 'needs_revision',
    unresolvedCorrections: ['RA-S01: wrong copy → use "Research Assistant"'],
  };
  return m;
};

describe('renderPrBody', () => {
  const body = renderPrBody(manifest(), [
    scenario('RA-S01', 'spec'),
    scenario('RA-S02', 'manual', 'needs a participant'),
  ]);

  it('starts with the marker the pipeline updates the body by', () => {
    assert.ok(body.startsWith(PR_BODY_MARKER));
  });

  it('links the source change and credits the author and ticket', () => {
    assert.match(
      body,
      /\[#412\]\(https:\/\/github\.com\/o\/r\/pull\/412\) — RA sessions minor enhancements by @dev-a · CIAS30-4188/,
    );
  });

  it('counts spec vs manual and lists every scenario, escaping table pipes', () => {
    assert.match(
      body,
      /\*\*2 scenarios\*\*: 1 will become Playwright specs, 1 stay manual/,
    );
    assert.match(
      body,
      /\| RA-S01 \| Title with a \\\| pipe for RA-S01 \| P0 \| spec \|/,
    );
    assert.match(body, /\| RA-S02 \| .* \| manual — needs a participant \|/);
  });

  it('lists the decisions taken, without asking, and unapplied findings', () => {
    assert.match(
      body,
      /- \*\*Should RA be hidden\?\*\* → yes\. The pill says RA is admin-only\. _Alternatives: no\._/,
    );
    assert.doesNotMatch(body, /- \[ \]/, 'nothing for the developer to answer');
    assert.match(body, /still flagged these after 2 revision round\(s\)/);
  });

  it('explains the approval command and shows cost', () => {
    assert.match(body, /Comment \*\*`\/e2e approve`\*\*/);
    assert.match(body, /\| plan \| claude-opus-5 \| \$1\.50 \| 61s \|/);
    assert.match(body, /Pills read: `tlfb-calendar-redux-subsystem\.md`/);
  });

  it('marks a failed stage and still counts its cost', () => {
    const m = recordStage(manifest(), {
      stage: 'review-1',
      model: 'claude-sonnet-5',
      outcome: 'failed',
      sessionId: 's2',
      costUsd: 0.25,
      durationMs: 9_000,
      finishedAt: '',
    });
    const failedBody = renderPrBody(m, []);
    assert.match(
      failedBody,
      /\| review-1 \(failed\) \| claude-sonnet-5 \| \$0\.25 \|/,
    );
    assert.match(failedBody, /\| \*\*total\*\* \| \| \*\*\$1\.75\*\* \|/);
  });
});

describe('renderReadyBody', () => {
  const ready = () => {
    const m = manifest();
    m.state = 'ready-for-review';
    m.approval = { sha: 'def4567890', by: 'dev-b', at: '' };
    m.specs = {
      files: [
        'e2e/sessions/ra-enhancements.spec.ts',
        'e2e/pages/TextMessagesPage.ts',
      ],
      tests: [
        {
          scenarioId: 'RA-S01',
          file: 'e2e/sessions/ra-enhancements.spec.ts',
          title: 'RA-S01 creates it',
          status: 'passed',
        },
        {
          scenarioId: 'RA-S03',
          file: 'e2e/sessions/ra-enhancements.spec.ts',
          title: 'RA-S03 gates it',
          status: 'fixme',
          note: 'Timeout 15000ms',
        },
      ],
      missing: ['RA-S04'],
      healRounds: 1,
      live: true,
      notes: 'Added TextMessagesPage.',
    };
    return m;
  };
  const body = renderReadyBody(ready(), [
    scenario('RA-S01', 'spec'),
    scenario('RA-S02', 'manual', 'needs a participant'),
    scenario('RA-S03', 'spec'),
    scenario('RA-S04', 'spec'),
  ]);

  it('credits the approver and summarises the results', () => {
    assert.match(body, /Scenarios approved by @dev-b at `def4567`/);
    assert.match(
      body,
      /\*\*2 tests\*\*: 1 passed twice live, 1 committed as `test\.fixme` · 1 heal round\(s\)/,
    );
  });

  it('gives every scenario a row: passed, fixme with reason, manual, missing', () => {
    assert.match(
      body,
      /\| RA-S01 \| `ra-enhancements\.spec\.ts` › RA-S01 creates it \| ✅ passed ×2 \|/,
    );
    assert.match(body, /\| RA-S03 \| .* \| ⏸ fixme — Timeout 15000ms \|/);
    assert.match(body, /\| RA-S02 \| — \| manual — needs a participant \|/);
    assert.match(body, /\| RA-S04 \| — \| ❌ no test generated \|/);
  });

  it('lists the files and tells the reviewer how to run them', () => {
    assert.match(body, /- `e2e\/pages\/TextMessagesPage\.ts`/);
    assert.match(body, /git fetch origin && git checkout e2e-ai\/pr-412/);
    assert.match(
      body,
      /npx playwright test e2e\/sessions\/ra-enhancements\.spec\.ts --project=webkit --headed/,
    );
  });

  it('warns loudly when nothing ran live', () => {
    const offline = ready();
    if (offline.specs) offline.specs.live = false;
    assert.match(
      renderReadyBody(offline, []),
      /\*\*not run live\*\* \(static checks only\)/,
    );
  });
});
