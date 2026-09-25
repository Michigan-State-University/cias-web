import type { PipelineConfig, StageConfig } from './config';
import { recordStage, type RunManifest } from './manifest';
import {
  runStage,
  StageError,
  type StageMode,
  type StageRequest,
  type StageResult,
  type StageUsage,
} from './runStage';

export type StageFields = Omit<
  StageRequest,
  | 'name'
  | 'model'
  | 'maxBudgetUsd'
  | 'timeoutMinutes'
  | 'effort'
  | 'cwd'
  | 'readDirs'
>;

export type StageRunner = <T>(
  name: string,
  stageConfig: StageConfig,
  fields: StageFields,
) => StageResult<T> | undefined;

// One runner per pipeline command; failed stages are billed against its budget too.
export const createStageRunner = (context: {
  config: PipelineConfig;
  mode: StageMode;
  stageDir: string;
  cwd: string;
  readDirs: string[];
  getManifest: () => RunManifest;
  setManifest: (manifest: RunManifest) => void;
}): StageRunner => {
  const startCost = context.getManifest().totalCostUsd;
  const budget = context.config.maxBudgetUsdPerCommand;

  return <T>(name: string, stageConfig: StageConfig, fields: StageFields) => {
    const spent = context.getManifest().totalCostUsd - startCost;
    const remaining = budget - spent;
    if (remaining <= 0) {
      throw new Error(`command budget of $${budget} spent before ${name}`);
    }

    const bill = (
      { sessionId, costUsd, durationMs, numTurns }: StageUsage,
      outcome: 'ok' | 'failed',
    ) =>
      context.setManifest(
        recordStage(context.getManifest(), {
          stage: name,
          model: stageConfig.model,
          outcome,
          sessionId,
          costUsd,
          durationMs,
          numTurns,
          finishedAt: new Date().toISOString(),
        }),
      );

    let result: StageResult<T> | undefined;
    try {
      result = runStage<T>(
        {
          name,
          model: stageConfig.model,
          maxBudgetUsd: Math.min(stageConfig.maxBudgetUsd, remaining),
          timeoutMinutes: stageConfig.timeoutMinutes,
          effort: stageConfig.effort,
          cwd: context.cwd,
          readDirs: context.readDirs,
          ...fields,
        },
        context.mode,
        context.stageDir,
      );
    } catch (error) {
      if (error instanceof StageError && error.usage)
        bill(error.usage, 'failed');
      throw error;
    }
    if (result) bill(result, 'ok');
    return result;
  };
};
