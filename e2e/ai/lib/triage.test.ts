import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { loadConfig } from './config';
import { behaviourFiles, ruleBasedSkip } from './triage';

const { skip } = loadConfig();

const pr = (
  headRef: string,
  changedFiles: string[],
  extra: { author?: string; labels?: string[] } = {},
) => ({
  headRef,
  changedFiles,
  author: extra.author ?? 'dev-a',
  labels: extra.labels ?? [],
});

describe('ruleBasedSkip — real PRs merged into dev', () => {
  it('keeps a feature PR that changed app code', () => {
    const decision = ruleBasedSkip(
      pr('CIAS30-4191-chart-validity-settings', [
        'app/containers/Charts/ChartSettings.tsx',
        'app/global/reducers/charts/reducer.ts',
      ]),
      skip,
    );
    assert.deepEqual(decision, { skip: false, reason: '2 app files changed' });
  });

  it('skips Dependabot', () => {
    const decision = ruleBasedSkip(
      pr('dependabot/npm_and_yarn/mjml', ['package.json'], {
        author: 'dependabot[bot]',
      }),
      skip,
    );
    assert.equal(decision.skip, true);
  });

  it('skips e2e-only and tooling PRs', () => {
    assert.equal(
      ruleBasedSkip(
        pr('chore/e2e-stabilize-shards', [
          'e2e/fixtures/test.ts',
          '.github/workflows/e2e-tests.yml',
        ]),
        skip,
      ).skip,
      true,
    );
    assert.equal(
      ruleBasedSkip(
        pr('htd-cq-setup', ['.github/workflows/code-quality.yml']),
        skip,
      ).skip,
      true,
    );
  });

  it('skips a translations-only PR', () => {
    const decision = ruleBasedSkip(
      pr(
        'CIAS30-4146-fix-spanish-translation-incorrect-terminology-for-character-count',
        ['app/translations/es.json'],
      ),
      skip,
    );
    assert.equal(decision.skip, true);
  });

  it("skips the pipeline's own branch", () => {
    assert.equal(
      ruleBasedSkip(pr('e2e-ai/pr-412', ['app/x.tsx']), skip).skip,
      true,
    );
  });

  it('skips promotion and back-merge branches', () => {
    ['dev_to_test_20052026', 'test_to_master_30042026', 'master'].forEach(
      (headRef) =>
        assert.equal(
          ruleBasedSkip(pr(headRef, ['app/x.tsx']), skip).skip,
          true,
          headRef,
        ),
    );
  });

  it('skips when labelled skip-e2e-gen', () => {
    assert.equal(
      ruleBasedSkip(
        pr('fix/x', ['app/x.tsx'], { labels: ['skip-e2e-gen'] }),
        skip,
      ).skip,
      true,
    );
  });
});

describe('behaviourFiles', () => {
  it('drops tests, snapshots and translations', () => {
    assert.deepEqual(
      behaviourFiles(
        [
          'app/components/Button/index.tsx',
          'app/components/Button/tests/index.test.tsx',
          'app/components/Button/tests/__snapshots__/index.test.tsx.snap',
          'app/utils/date.test.ts',
          'app/translations/en.json',
          'e2e/pages/SessionPage.ts',
        ],
        skip,
      ),
      ['app/components/Button/index.tsx'],
    );
  });
});

describe('behaviourFiles — the paired backend PR', () => {
  it('keeps what can change behaviour and drops specs, as on #414', () => {
    const { pairedBehaviour } = loadConfig();
    assert.ok(pairedBehaviour);
    assert.deepEqual(
      behaviourFiles(
        [
          'app/services/v1/sms_plans/schedule.rb',
          'spec/services/v1/sms_plans/schedule_spec.rb',
          'spec/requests/v1/sms_plans/create_spec.rb',
          'app/models/sms_plan.rb',
          'db/migrate/20260901_add_kind_to_sms_plans.rb',
          'db/schema.rb',
          'config/routes.rb',
          'config/locales/en.yml',
          'lib/tasks/backfill.rake',
          '.rubocop.yml',
        ],
        pairedBehaviour,
      ),
      [
        'app/services/v1/sms_plans/schedule.rb',
        'app/models/sms_plan.rb',
        'db/migrate/20260901_add_kind_to_sms_plans.rb',
        'config/routes.rb',
        'lib/tasks/backfill.rake',
      ],
    );
  });
});
