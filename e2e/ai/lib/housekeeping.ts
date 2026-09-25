import type { PipelineConfig } from './config';
import {
  canWrite,
  manifestAt,
  permissionOf,
  scenariosChangedSince,
  viewDraft,
} from './github';
import type { RunManifest } from './manifest';
import { gh, ghJson } from './shell';

export const DECLINED_LABEL = 'e2e-declined';

const addLabel = (pr: number, config: PipelineConfig) => {
  try {
    gh([
      'pr',
      'edit',
      String(pr),
      '-R',
      config.repo,
      '--add-label',
      DECLINED_LABEL,
    ]);
  } catch {
    // The label may not exist in this repo yet; closing is what matters.
  }
};

export const decline = (
  pr: number,
  by: string,
  config: PipelineConfig,
): string => {
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
      `${by} can't decline: needs write access, has ${permission}`,
    );
  gh([
    'pr',
    'close',
    String(pr),
    '-R',
    config.repo,
    '--comment',
    `Declined by @${by} with \`/e2e decline\`. The scenarios stay on \`${draft.headRefName}\` for reference.`,
  ]);
  addLabel(pr, config);
  return draft.url;
};

// The marker carries the approved commit, so each re-approval gets its own notice.
export const noticeMarker = (approvalSha: string) =>
  `<!-- e2e-ai:scenarios-changed:${approvalSha} -->`;

export const scenariosNotice = (input: {
  manifest: RunManifest;
  changed: boolean;
  comments: string[];
}): string | undefined => {
  const approval = input.manifest.approval;
  // Before approval, editing the scenarios is the normal flow.
  if (!approval || !input.changed) return undefined;
  const marker = noticeMarker(approval.sha);
  if (input.comments.some((body) => body.includes(marker))) return undefined;
  return [
    marker,
    `⚠️ The scenarios changed after @${approval.by} approved them at \`${approval.sha.slice(0, 7)}\` — the specs on this PR were generated from the earlier version.`,
    '',
    'Comment `/e2e approve` to regenerate the specs from the scenarios as they are now, or revert the scenario edit.',
  ].join('\n');
};

export const checkScenarios = (pr: number, config: PipelineConfig): boolean => {
  const draft = viewDraft(pr, config);
  const manifest = manifestAt(draft, config);
  const changed = manifest.approval
    ? scenariosChangedSince(manifest.approval.sha, draft, config)
    : false;
  const { comments } = ghJson<{ comments: { body: string }[] }>([
    'pr',
    'view',
    String(pr),
    '-R',
    config.repo,
    '--json',
    'comments',
  ]);
  const notice = scenariosNotice({
    manifest,
    changed,
    comments: comments.map((c) => c.body),
  });
  if (notice)
    gh(['pr', 'comment', String(pr), '-R', config.repo, '--body', notice]);
  return Boolean(notice);
};

type OpenPr = {
  number: number;
  headRefName: string;
  isDraft: boolean;
  createdAt: string;
};

export const staleDrafts = (
  prs: OpenPr[],
  config: Pick<PipelineConfig, 'branchPrefix' | 'staleDraftDays'>,
  now = new Date(),
): OpenPr[] =>
  prs.filter(
    (pr) =>
      pr.isDraft &&
      pr.headRefName.startsWith(config.branchPrefix) &&
      now.getTime() - new Date(pr.createdAt).getTime() >
        config.staleDraftDays * 86_400_000,
  );

export const sweep = (config: PipelineConfig, now = new Date()): number[] => {
  const open = ghJson<OpenPr[]>([
    'pr',
    'list',
    '-R',
    config.repo,
    '--state',
    'open',
    '--limit',
    '200',
    '--json',
    'number,headRefName,isDraft,createdAt',
  ]);
  return staleDrafts(open, config, now).map((pr) => {
    gh([
      'pr',
      'close',
      String(pr.number),
      '-R',
      config.repo,
      '--comment',
      `Closed: the scenarios weren't approved within ${config.staleDraftDays} days. Re-run the pipeline for the PR from the Actions tab if they're still wanted.`,
    ]);
    addLabel(pr.number, config);
    return pr.number;
  });
};
