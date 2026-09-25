import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isSmallChange, loadConfig, stageConfigFor } from './config';

const config = loadConfig();

describe('change sizing', () => {
  it('treats a one-line fix as small and a feature as not', () => {
    assert.equal(
      isSmallChange(config, { files: 1, changedLines: 1 }),
      true,
      '#385',
    );
    assert.equal(
      isSmallChange(config, { files: 10, changedLines: 72 }),
      false,
      '#404',
    );
    assert.equal(
      isSmallChange(config, { files: 3, changedLines: 61 }),
      false,
      'just over on lines',
    );
  });

  it('lightens the planner and reviewer for a small change only', () => {
    const small = stageConfigFor(config, 'plan', true);
    const normal = stageConfigFor(config, 'plan', false);
    assert.equal(small.model, normal.model, 'same model either way');
    assert.equal(small.effort, 'medium');
    assert.ok(small.maxBudgetUsd < normal.maxBudgetUsd);
    assert.equal(stageConfigFor(config, 'review', true).effort, 'low');
    assert.equal(stageConfigFor(config, 'review', false).effort, 'medium');
    assert.equal(
      stageConfigFor(config, 'review', true).maxRevisions,
      config.stages.review.maxRevisions,
      'keeps settings the override does not touch',
    );
  });
});
