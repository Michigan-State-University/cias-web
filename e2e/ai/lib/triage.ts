import type { SkipConfig } from './config';

export type TriageInput = {
  author?: string;
  headRef: string;
  labels: string[];
  changedFiles: string[];
};

export type RuleDecision = { skip: boolean; reason: string };

// Files that can change what a user sees: app code minus tests and translations.
export const behaviourFiles = (
  files: string[],
  skip: Pick<SkipConfig, 'behaviourPathPattern' | 'nonBehaviourPathPatterns'>,
): string[] => {
  const behaviour = new RegExp(skip.behaviourPathPattern);
  const nonBehaviour = skip.nonBehaviourPathPatterns.map((p) => new RegExp(p));
  return files.filter(
    (file) => behaviour.test(file) && !nonBehaviour.some((p) => p.test(file)),
  );
};

export const ruleBasedSkip = (
  input: TriageInput,
  skip: SkipConfig,
): RuleDecision => {
  if (input.author && skip.authors.includes(input.author)) {
    return { skip: true, reason: `opened by ${input.author}` };
  }

  const branchRule = skip.headBranchPatterns.find((p) =>
    new RegExp(p).test(input.headRef),
  );
  if (branchRule) {
    return {
      skip: true,
      reason: `branch ${input.headRef} is excluded (${branchRule})`,
    };
  }

  const label = input.labels.find((l) => skip.labels.includes(l));
  if (label) return { skip: true, reason: `labelled ${label}` };

  const files = behaviourFiles(input.changedFiles, skip);
  if (files.length === 0) {
    return {
      skip: true,
      reason: 'no app code outside tests and translations changed',
    };
  }

  return {
    skip: false,
    reason: `${files.length} app file${files.length === 1 ? '' : 's'} changed`,
  };
};
