import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { loadConfig } from './config';
import { pickLatest, requestedPr, type MergedPr } from './latest';

const config = loadConfig();

const merged = (
  number: number,
  mergedAt: string,
  headRefName: string,
  files: string[],
): MergedPr => ({
  number,
  mergedAt,
  headRefName,
  author: { login: 'szymonklempert' },
  labels: [],
  files: files.map((path) => ({ path })),
});

const RECENT = [
  merged(416, '2026-09-24T09:00:49Z', 'CIAS30-4187-test-participant-marker', [
    'app/app.tsx',
    'app/containers/TestLinkTokenGate/index.tsx',
  ]),
  merged(418, '2026-09-24T10:49:55Z', 'chore/e2e-stabilize-shards', [
    '.github/workflows/e2e-tests.yml',
    'e2e/pages/SessionPage.ts',
  ]),
  merged(
    417,
    '2026-09-24T11:14:33Z',
    'chore/bump-minimatch-eslint-config-prettier',
    ['mjml/package-lock.json', 'package-lock.json'],
  ),
];

describe('pickLatest — the temporary push trigger', () => {
  it('takes the newest merge the rules keep, naming the ones they skipped', () => {
    const decision = pickLatest(RECENT, config, () => false);
    assert.equal(decision.action, 'generate');
    assert.equal('pr' in decision && decision.pr, 416);
    assert.match(decision.reason, /\(#417, #418 skipped by the rules\)/);
  });

  it('stands down when that PR already has a draft branch', () => {
    const decision = pickLatest(
      RECENT,
      config,
      (branch) => branch === 'e2e-ai/pr-416',
    );
    assert.equal(decision.action, 'ignore');
    assert.match(
      decision.reason,
      /already has e2e-ai\/pr-416\. Delete that branch/,
    );
  });

  it('does nothing when no recent merge needs scenarios', () => {
    assert.equal(
      pickLatest(RECENT.slice(1), config, () => false).action,
      'ignore',
    );
  });
});

describe('requestedPr', () => {
  it('reads "e2e-ai: #416" from a commit message', () => {
    assert.equal(requestedPr('chore: try the pipeline\n\ne2e-ai: #416'), 416);
    assert.equal(requestedPr('E2E-AI: 414'), 414);
    assert.equal(requestedPr('fix the e2e-ai pipeline'), undefined);
  });
});
