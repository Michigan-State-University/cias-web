import { REPO_ROOT, type PipelineConfig } from './config';
import type { RunManifest } from './manifest';
import { gh, ghJson, git } from './shell';

// Shared GitHub reads only; writes stay next to the code that decides them.

export type DraftPr = {
  number: number;
  headRefName: string;
  headRefOid: string;
  isDraft: boolean;
  state: string;
  url: string;
};

export const viewDraft = (pr: number, config: PipelineConfig): DraftPr =>
  ghJson<DraftPr>([
    'pr',
    'view',
    String(pr),
    '-R',
    config.repo,
    '--json',
    'number,headRefName,headRefOid,isDraft,state,url',
  ]);

export const currentLogin = (): string =>
  gh(['api', 'user', '--jq', '.login']).trim();

// admin | maintain | write | triage | read | none
export const permissionOf = (login: string, config: PipelineConfig): string =>
  gh([
    'api',
    `repos/${config.repo}/collaborators/${login}/permission`,
    '--jq',
    '.permission',
  ]).trim();

export const canWrite = (permission: string): boolean =>
  ['admin', 'maintain', 'write'].includes(permission);

export const runIdOf = (draft: DraftPr, config: PipelineConfig): string =>
  draft.headRefName.slice(config.branchPrefix.length);

export const manifestAt = (
  draft: DraftPr,
  config: PipelineConfig,
): RunManifest => {
  git(['fetch', '--no-tags', 'origin', draft.headRefOid], REPO_ROOT);
  return JSON.parse(
    git(
      [
        'show',
        `${draft.headRefOid}:${config.scenariosDir}/${runIdOf(draft, config)}/run.json`,
      ],
      REPO_ROOT,
    ),
  );
};

export const scenariosChangedSince = (
  sha: string,
  draft: DraftPr,
  config: PipelineConfig,
): boolean => {
  const file = `${config.scenariosDir}/${runIdOf(draft, config)}/scenarios.md`;
  return (
    git(
      ['diff', '--name-only', sha, draft.headRefOid, '--', file],
      REPO_ROOT,
    ) !== ''
  );
};
