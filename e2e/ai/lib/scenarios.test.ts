import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseScenarios, summarize } from './scenarios';

const VALID = `# E2E scenarios — RA sessions

Source: https://github.com/org/repo/pull/412 · Ticket: CIAS30-4188

Pills used: intervention-content-hierarchy-sti.md

### RA-S01 — Creates a Research Assistant session
- automation: spec
- priority: P0
- covers: InterventionPage create-session modal, RA option
- grounded-in: intervention-content-hierarchy-sti.md, app/containers/CreateSessionModal
- preconditions: a fresh intervention
- steps:
  1. open "Create session", pick "Research Assistant" → option is selectable
  2. click create → POST /sessions answers 201; one session listed
- page-objects: InterventionPage.createRaSession, expectSessionCount

### RA-S02 — Participant sees the RA data-entry screen
- automation: manual — needs a participant account
- priority: P1
- covers: participant view
- grounded-in: participant-session-flow-engine.md
- steps:
  1. open the session as a participant → RA screen shown
`;

describe('parseScenarios', () => {
  it('parses spec and manual scenarios', () => {
    const { scenarios, errors } = parseScenarios(VALID);
    assert.deepEqual(errors, []);
    assert.equal(scenarios.length, 2);
    const [spec, manual] = scenarios;
    assert.equal(spec.id, 'RA-S01');
    assert.equal(spec.title, 'Creates a Research Assistant session');
    assert.equal(spec.automation, 'spec');
    assert.equal(spec.steps.length, 2);
    assert.match(spec.steps[1], /POST \/sessions answers 201/);
    assert.equal(
      spec.pageObjects,
      'InterventionPage.createRaSession, expectSessionCount',
    );
    assert.equal(manual.automation, 'manual');
    assert.equal(manual.manualReason, 'needs a participant account');
  });

  it('summarizes', () => {
    assert.deepEqual(summarize(parseScenarios(VALID).scenarios), {
      total: 2,
      spec: 1,
      manual: 1,
      ids: ['RA-S01', 'RA-S02'],
    });
  });

  it('reports a file with no scenarios', () => {
    assert.deepEqual(parseScenarios('# nothing here').errors, [
      'no scenarios found (expected "### ID — title" headers)',
    ]);
  });

  it('reports malformed headers', () => {
    const { errors } = parseScenarios('### Just a title\n- automation: spec');
    assert.match(errors[0], /not a scenario header/);
  });

  it('reports missing fields, bad values, empty steps and manual without a reason', () => {
    const { errors } = parseScenarios(`### X-S01 — Broken
- automation: maybe
- priority: P7
- steps:

### X-S02 — Manual without why
- automation: manual
- priority: P1
- covers: a
- grounded-in: b
- steps:
  1. a → b
`);
    assert.deepEqual(errors, [
      'X-S01: missing "- covers:"',
      'X-S01: missing "- grounded-in:"',
      'X-S01: automation must be "spec" or "manual — <reason>", got "maybe"',
      'X-S01: priority must be one of P0/P1/P2, got "P7"',
      'X-S01: "- steps:" has no numbered steps',
      'X-S02: a manual scenario needs a reason ("manual — <why>")',
    ]);
  });

  it('reports duplicate IDs', () => {
    const block =
      '- automation: spec\n- priority: P0\n- covers: a\n- grounded-in: b\n- steps:\n  1. a → b\n';
    const { errors } = parseScenarios(
      `### A-S01 — one\n${block}\n### A-S01 — two\n${block}`,
    );
    assert.deepEqual(errors, ['A-S01: duplicate scenario ID']);
  });

  it('accepts an en dash or hyphen in the header', () => {
    const block =
      '- automation: spec\n- priority: P0\n- covers: a\n- grounded-in: b\n- steps:\n  1. a → b\n';
    assert.deepEqual(
      parseScenarios(
        `### A-S01 – en dash\n${block}\n### A-S02 - hyphen\n${block}`,
      ).errors,
      [],
    );
  });
});
