import type { PipelineConfig } from './config';
import { generate, type GenerateResult } from './generate';
import { canWrite, manifestAt, permissionOf, viewDraft } from './github';
import type { StageMode } from './runStage';

// `/e2e regenerate <notes>`: redraft a draft PR's scenarios with the notes, before approval.
export const regenerate = (input: {
  pr: number;
  notes: string;
  by: string;
  mode: StageMode;
  config: PipelineConfig;
}): GenerateResult => {
  const { pr, notes, by, mode, config } = input;
  const draft = viewDraft(pr, config);
  if (
    draft.state !== 'OPEN' ||
    !draft.headRefName.startsWith(config.branchPrefix)
  ) {
    throw new Error(`#${pr} is not an open pipeline PR`);
  }
  const permission = permissionOf(by, config);
  if (!canWrite(permission))
    throw new Error(
      `${by} can't regenerate: needs write access, has ${permission}`,
    );

  const previous = manifestAt(draft, config);
  if (previous.state !== 'awaiting-approval') {
    throw new Error(
      `the scenarios are past approval (${previous.state}) — edit scenarios.md directly and comment /e2e approve to regenerate the specs`,
    );
  }
  if (!previous.source.pr)
    throw new Error('only runs for a merged PR can be regenerated in CI');

  return generate(
    {
      pr: previous.source.pr,
      ticket: previous.source.ticket,
      mode,
      publish: true,
      keepWork: false,
      // It already passed triage once.
      modelTriage: false,
      redraft: { draft, previous, notes, by },
    },
    config,
  );
};
