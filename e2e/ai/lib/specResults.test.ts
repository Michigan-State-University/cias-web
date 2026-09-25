import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { specResults } from './specResults';

const FILE = 'e2e/sessions/ra-enhancements.spec.ts';
const SOURCE = `test.describe('RA', () => {
  test('RAE-S01 describes the RA session', async () => {});
  // e2e-ai: still failing after healing — Timeout
  test.fixme('RAE-S02 shows the RA delete confirmation', async () => {});
  test.fixme('RAE-S03 disables Fill RA Session in a draft', async () => {});
});
`;

describe('specResults', () => {
  const result = specResults({
    specs: [{ file: FILE, source: SOURCE }],
    live: [
      {
        file: FILE,
        title: 'RAE-S01 describes the RA session',
        line: 2,
        outcome: 'passed',
      },
    ],
    liveRan: true,
    fixmeNotes: new Map([
      ['RAE-S02 shows the RA delete confirmation', 'Timeout 15000ms'],
    ]),
    specScenarioIds: ['RAE-S01', 'RAE-S02', 'RAE-S03', 'RAE-S04'],
  });

  it('maps each test to its scenario by the ID prefix', () => {
    assert.deepEqual(
      result.tests.map((t) => [t.scenarioId, t.status]),
      [
        ['RAE-S01', 'passed'],
        ['RAE-S02', 'fixme'],
        ['RAE-S03', 'fixme'],
      ],
    );
  });

  it('keeps the reason for fixmes the pipeline made, not for codegen’s own', () => {
    assert.equal(result.tests[1].note, 'Timeout 15000ms');
    assert.equal(result.tests[2].note, undefined);
  });

  it('lists spec scenarios that got no test', () => {
    assert.deepEqual(result.missing, ['RAE-S04']);
  });

  it('marks everything not-run when the live run was skipped', () => {
    const offline = specResults({
      specs: [{ file: FILE, source: "test('RAE-S01 x', async () => {});" }],
      live: [],
      liveRan: false,
      fixmeNotes: new Map(),
      specScenarioIds: ['RAE-S01'],
    });
    assert.equal(offline.tests[0].status, 'not-run');
  });
});
