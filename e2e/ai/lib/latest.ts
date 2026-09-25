import type { PipelineConfig } from './config';
import type { RouteDecision } from './router';
import { ghJson } from './shell';
import { ruleBasedSkip } from './triage';

// TEMPORARY: backs the temporary `push` trigger in e2e-ai.yml (trying the pipeline off the default branch).
// Delete this file together with that trigger.

export type MergedPr = {
  number: number;
  mergedAt: string;
  headRefName: string;
  author: { login: string };
  labels: { name: string }[];
  files: { path: string }[];
};

export const draftBranch = (config: PipelineConfig, pr: number): string =>
  `${config.branchPrefix}pr-${pr}`;

export const pickLatest = (
  prs: MergedPr[],
  config: PipelineConfig,
  hasBranch: (branch: string) => boolean,
): RouteDecision => {
  const skipped: string[] = [];
  const newestFirst = [...prs].sort((a, b) =>
    b.mergedAt.localeCompare(a.mergedAt),
  );
  for (const pr of newestFirst) {
    const rules = ruleBasedSkip(
      {
        author: pr.author.login,
        headRef: pr.headRefName,
        labels: pr.labels.map((label) => label.name),
        changedFiles: pr.files.map((file) => file.path),
      },
      config.skip,
    );
    if (rules.skip) {
      skipped.push(`#${pr.number}`);
      continue;
    }
    const branch = draftBranch(config, pr.number);
    if (hasBranch(branch)) {
      return {
        action: 'ignore',
        reason: `#${pr.number}, the latest merged PR that needs scenarios, already has ${branch}. Delete that branch (and close its draft PR) to redraft`,
      };
    }
    return {
      action: 'generate',
      pr: pr.number,
      reason: `push trigger (temporary): #${pr.number} is the latest PR merged into ${config.baseBranch} that needs scenarios${
        skipped.length > 0
          ? ` (${skipped.join(', ')} skipped by the rules)`
          : ''
      }`,
    };
  }
  return {
    action: 'ignore',
    reason: `none of the last ${prs.length} PRs merged into ${config.baseBranch} needs scenarios`,
  };
};

export const requestedPr = (commitMessage: string): number | undefined => {
  const match = commitMessage.match(/\be2e-ai:\s*#?(\d+)\b/i);
  return match ? Number(match[1]) : undefined;
};

const branchExists = (config: PipelineConfig, branch: string): boolean =>
  // matching-refs is a prefix match (e2e-ai/pr-41 finds e2e-ai/pr-416).
  ghJson<{ ref: string }[]>([
    'api',
    `repos/${config.repo}/git/matching-refs/heads/${branch}`,
  ]).some(({ ref }) => ref === `refs/heads/${branch}`);

export const latestMergedDecision = (
  config: PipelineConfig,
  commitMessage = '',
): RouteDecision => {
  const requested = requestedPr(commitMessage);
  if (requested) {
    const branch = draftBranch(config, requested);
    return branchExists(config, branch)
      ? {
          action: 'ignore',
          reason: `#${requested} already has ${branch}. Delete that branch (and close its draft PR) to redraft`,
        }
      : {
          action: 'generate',
          pr: requested,
          reason: `push trigger (temporary): #${requested}, named in the commit message`,
        };
  }
  return pickLatest(
    ghJson<MergedPr[]>([
      'pr',
      'list',
      '-R',
      config.repo,
      '--base',
      config.baseBranch,
      '--state',
      'merged',
      '--limit',
      '20',
      '--json',
      'number,mergedAt,headRefName,author,labels,files',
    ]),
    config,
    (branch) => branchExists(config, branch),
  );
};
