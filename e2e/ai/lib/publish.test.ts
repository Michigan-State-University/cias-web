import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { loadConfig } from './config';
import { createManifest, type SourceChange } from './manifest';
import { draftBase, pipelineBranch, publishPlan, redraftPlan } from './publish';

const config = loadConfig();
const prSource: SourceChange = {
  kind: 'pr',
  pr: 412,
  title: 'RA sessions minor enhancements',
  headRef: 'CIAS30-4188-ra',
  baseRef: 'dev',
  sha: 'abc',
  labels: [],
  changedFiles: [],
};

describe('publishPlan', () => {
  it('drafts a merged PR’s scenarios against dev on e2e-ai/pr-<N>', () => {
    const manifest = createManifest('pr-412', prSource);
    assert.equal(pipelineBranch(config, manifest), 'e2e-ai/pr-412');
    assert.equal(draftBase(config, manifest), 'dev');

    const plan = publishPlan(
      config,
      manifest,
      '/work/checkout',
      '/work/body.md',
    );
    assert.deepEqual(
      plan.map(
        ({ command, args }) => `${command} ${args.slice(0, 2).join(' ')}`,
      ),
      [
        'git switch -c',
        'git add e2e/scenarios/pr-412',
        'git commit -m',
        'git push --set-upstream',
        'gh pr create',
      ],
    );
    assert.ok(
      plan.every(({ cwd }) => cwd === '/work/checkout'),
      'runs in the stage checkout, never the developer’s tree',
    );
    const create = plan[4].args;
    assert.ok(create.includes('--draft'));
    assert.equal(create[create.indexOf('--base') + 1], 'dev');
    assert.equal(
      create[create.indexOf('--title') + 1],
      'E2E scenarios: RA sessions minor enhancements',
    );
  });

  it('targets the feature branch itself for a local, pre-merge run', () => {
    const manifest = createManifest('branch-feature-x', {
      ...prSource,
      kind: 'branch',
      pr: undefined,
      headRef: 'feature/x',
    });
    assert.equal(draftBase(config, manifest), 'feature/x');
    assert.equal(pipelineBranch(config, manifest), 'e2e-ai/branch-feature-x');
  });
});

describe('redraftPlan', () => {
  it('commits onto the existing draft branch and refreshes its body — never force-pushes', () => {
    const manifest = createManifest('pr-412', prSource);
    const draft = {
      number: 431,
      headRefName: 'e2e-ai/pr-412',
      headRefOid: 'abc',
      isDraft: true,
      state: 'OPEN',
      url: 'https://github.com/o/r/pull/431',
    };
    const plan = redraftPlan(
      config,
      manifest,
      '/work/publish',
      '/work/body.md',
      draft,
    );
    assert.deepEqual(
      plan.map(({ command, args }) => `${command} ${args.join(' ')}`),
      [
        'git add e2e/scenarios/pr-412',
        'git commit -m test(e2e): redraft E2E scenarios (#431)',
        'git push origin HEAD:refs/heads/e2e-ai/pr-412',
        `gh pr edit 431 -R ${config.repo} --body-file /work/body.md`,
      ],
    );
    assert.ok(!plan.some(({ args }) => args.includes('--force')));
  });
});
