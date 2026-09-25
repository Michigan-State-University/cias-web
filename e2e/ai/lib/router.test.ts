import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { githubOutputs, routeEvent, type RouteOptions } from './router';

const options: RouteOptions = {
  baseBranch: 'dev',
  branchPrefix: 'e2e-ai/',
  autoEnabled: true,
};

const merged = (
  overrides: {
    head?: string;
    base?: string;
    merged?: boolean;
    action?: string;
  } = {},
) => ({
  action: overrides.action ?? 'closed',
  pull_request: {
    number: 412,
    merged: overrides.merged ?? true,
    head: {
      ref: overrides.head ?? 'CIAS30-4188-ra-sessions-minor-enhancements',
    },
    base: { ref: overrides.base ?? 'dev' },
  },
});

const comment = (
  body: string,
  overrides: { type?: string; association?: string; onPr?: boolean } = {},
) => ({
  action: 'created',
  issue: {
    number: 431,
    ...(overrides.onPr === false ? {} : { pull_request: {} }),
  },
  comment: {
    body,
    user: { login: 'dev-a', type: overrides.type ?? 'User' },
    author_association: overrides.association ?? 'MEMBER',
  },
});

describe('routeEvent — merged PRs', () => {
  it('generates for a feature PR merged into dev', () => {
    assert.deepEqual(routeEvent('pull_request', merged(), options), {
      action: 'generate',
      pr: 412,
      reason: '#412 merged into dev',
    });
  });

  it('ignores a PR closed without merging', () => {
    assert.equal(
      routeEvent('pull_request', merged({ merged: false }), options).action,
      'ignore',
    );
  });

  it('ignores merges into other branches', () => {
    assert.equal(
      routeEvent('pull_request', merged({ base: 'master' }), options).action,
      'ignore',
    );
  });

  it("ignores the pipeline's own PR being merged (loop guard)", () => {
    const decision = routeEvent(
      'pull_request',
      merged({ head: 'e2e-ai/pr-412' }),
      options,
    );
    assert.deepEqual(decision, {
      action: 'ignore',
      reason: "#412 is the pipeline's own PR",
    });
  });

  it('stays inert while E2E_AI_AUTO is off', () => {
    const decision = routeEvent('pull_request', merged(), {
      ...options,
      autoEnabled: false,
    });
    assert.equal(decision.action, 'ignore');
  });

  it('checks scenarios when a pipeline PR is pushed to', () => {
    const decision = routeEvent(
      'pull_request',
      merged({ action: 'synchronize', head: 'e2e-ai/pr-412' }),
      options,
    );
    assert.equal(decision.action, 'check-scenarios');
  });

  it("ignores the pipeline's own pushes (its GitHub App)", () => {
    const push = {
      ...merged({ action: 'synchronize', head: 'e2e-ai/pr-412' }),
      sender: { login: 'cias-e2e-ai[bot]', type: 'Bot' },
    };
    assert.deepEqual(routeEvent('pull_request', push, options), {
      action: 'ignore',
      reason: 'push by cias-e2e-ai[bot]',
    });
  });

  it('ignores pushes to PRs the pipeline did not open', () => {
    assert.equal(
      routeEvent('pull_request', merged({ action: 'synchronize' }), options)
        .action,
      'ignore',
    );
  });
});

describe('routeEvent — /e2e commands', () => {
  it('approves', () => {
    assert.deepEqual(
      routeEvent('issue_comment', comment('/e2e approve'), options),
      {
        action: 'approve',
        pr: 431,
        commenter: 'dev-a',
        reason: '/e2e approve by dev-a',
      },
    );
  });

  it('reads only the first line, case-insensitively', () => {
    const decision = routeEvent(
      'issue_comment',
      comment('  /E2E Approve\nlooks good'),
      options,
    );
    assert.equal(decision.action, 'approve');
  });

  it('passes regenerate notes through, including later lines', () => {
    const decision = routeEvent(
      'issue_comment',
      comment('/e2e regenerate cover the empty state\nand the error toast'),
      options,
    );
    assert.equal(decision.action, 'regenerate');
    assert.equal(
      decision.action === 'regenerate' && decision.notes,
      'cover the empty state\nand the error toast',
    );
  });

  it('declines', () => {
    assert.equal(
      routeEvent('issue_comment', comment('/e2e decline'), options).action,
      'decline',
    );
  });

  it('ignores a command mentioned mid-comment', () => {
    assert.equal(
      routeEvent(
        'issue_comment',
        comment('please run /e2e approve later'),
        options,
      ).action,
      'ignore',
    );
  });

  it('ignores lookalike commands', () => {
    assert.equal(
      routeEvent('issue_comment', comment('/e2e approved'), options).action,
      'ignore',
    );
  });

  it('ignores bots', () => {
    assert.equal(
      routeEvent(
        'issue_comment',
        comment('/e2e approve', { type: 'Bot' }),
        options,
      ).action,
      'ignore',
    );
  });

  it('ignores people without write access', () => {
    const decision = routeEvent(
      'issue_comment',
      comment('/e2e approve', { association: 'CONTRIBUTOR' }),
      options,
    );
    assert.equal(decision.action, 'ignore');
  });

  it('ignores comments on issues', () => {
    assert.equal(
      routeEvent(
        'issue_comment',
        comment('/e2e approve', { onPr: false }),
        options,
      ).action,
      'ignore',
    );
  });
});

describe('routeEvent — manual runs', () => {
  it('generates for the PR number given', () => {
    assert.deepEqual(
      routeEvent(
        'workflow_dispatch',
        { inputs: { pr: '398' } },
        { ...options, autoEnabled: false },
      ),
      {
        action: 'generate',
        pr: 398,
        reason: 'manual run for #398',
      },
    );
  });

  it('rejects a missing or malformed PR number', () => {
    assert.equal(
      routeEvent('workflow_dispatch', { inputs: { pr: 'abc' } }, options)
        .action,
      'ignore',
    );
    assert.equal(routeEvent('workflow_dispatch', {}, options).action, 'ignore');
  });

  it('sweeps stale drafts on the daily schedule', () => {
    assert.equal(routeEvent('schedule', {}, options).action, 'sweep');
  });

  it('ignores events it has no route for', () => {
    assert.equal(routeEvent('push', {}, options).action, 'ignore');
  });
});

describe('githubOutputs', () => {
  it('writes every field with the delimiter, so comment text can’t forge an output', () => {
    const decision = routeEvent(
      'issue_comment',
      comment('/e2e regenerate first line\nEOF\naction<<X\nsweep\nX'),
      options,
    );
    const text = githubOutputs(decision, 'D1');
    assert.match(text, /^action<<D1\nregenerate\nD1\n/);
    assert.match(text, /pr<<D1\n431\nD1\n/);
    assert.match(text, /notes<<D1\nfirst line\nEOF\naction<<X\nsweep\nX\nD1\n/);
  });

  it('uses a fresh random delimiter by default', () => {
    const decision = routeEvent('schedule', {}, options);
    assert.notEqual(
      githubOutputs(decision).split('\n')[0],
      githubOutputs(decision).split('\n')[0],
    );
  });
});
