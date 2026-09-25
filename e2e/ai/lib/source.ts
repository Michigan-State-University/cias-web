import type { PipelineConfig } from './config';
import type { PairedChange, SourceChange } from './manifest';
import { gh, ghJson, git } from './shell';

export type Gathered = {
  source: SourceChange;
  patch: string;
  body: string;
  paired?: { change: PairedChange; patch: string };
};

type GhPr = {
  number: number;
  title: string;
  body: string;
  url: string;
  author: { login: string };
  headRefName: string;
  baseRefName: string;
  headRefOid: string;
  mergeCommit: { oid: string } | null;
  labels: { name: string }[];
  files: { path: string }[];
  state: string;
};

type GhPrSummary = {
  number: number;
  title: string;
  state: string;
  url: string;
  headRefName: string;
};

// Names spell the ticket several ways (CIAS30-4188, cias-4188): match the number.
export const findTicket = (
  texts: string[],
  pattern: string,
): { ticket: string; number: string } | undefined => {
  const re = new RegExp(pattern, 'i');
  const match = texts.map((text) => text.match(re)).find(Boolean);
  return match
    ? { ticket: match[0].toUpperCase(), number: match[1] }
    : undefined;
};

const pairedChange = (
  number: string,
  repo: string,
): Gathered['paired'] | undefined => {
  const prs = ghJson<GhPrSummary[]>([
    'pr',
    'list',
    '-R',
    repo,
    '--search',
    number,
    '--state',
    'all',
    '--json',
    'number,title,state,url,headRefName',
    '--limit',
    '10',
  ])
    .filter((pr) => `${pr.title} ${pr.headRefName}`.includes(number))
    .sort((a, b) => b.number - a.number)
    .slice(0, 3);
  if (prs.length === 0) return undefined;

  const patch = prs
    .map(
      (pr) =>
        `# ${repo}#${pr.number} (${pr.state}) ${pr.title}\n${gh(['pr', 'diff', String(pr.number), '-R', repo])}`,
    )
    .join('\n');
  return {
    change: {
      repo,
      prs: prs.map(({ number: n, title, state, url }) => ({
        number: n,
        title,
        state,
        url,
      })),
    },
    patch,
  };
};

export const fromPr = (
  pr: number,
  config: PipelineConfig,
  ticketOverride?: string,
): Gathered => {
  const view = ghJson<GhPr>([
    'pr',
    'view',
    String(pr),
    '-R',
    config.repo,
    '--json',
    'number,title,body,url,author,headRefName,baseRefName,headRefOid,mergeCommit,labels,files,state',
  ]);
  const found = ticketOverride
    ? findTicket([ticketOverride], config.ticketPattern)
    : findTicket([view.headRefName, view.title], config.ticketPattern);

  return {
    source: {
      kind: 'pr',
      pr: view.number,
      title: view.title,
      url: view.url,
      author: view.author.login,
      headRef: view.headRefName,
      baseRef: view.baseRefName,
      sha: view.mergeCommit?.oid ?? view.headRefOid,
      ticket: found?.ticket,
      labels: view.labels.map((label) => label.name),
      changedFiles: view.files.map((file) => file.path),
    },
    patch: gh(['pr', 'diff', String(pr), '-R', config.repo]),
    body: view.body,
    paired:
      found && config.pairedRepo
        ? pairedChange(found.number, config.pairedRepo)
        : undefined,
  };
};

export const fromBranch = (
  branch: string,
  base: string,
  config: PipelineConfig,
  ticketOverride?: string,
): Gathered => {
  const sha = git(['rev-parse', branch]);
  const mergeBase = git(['merge-base', base, branch]);
  const found = findTicket([ticketOverride ?? branch], config.ticketPattern);

  return {
    source: {
      kind: 'branch',
      title: git(['log', '-1', '--format=%s', branch]),
      author: git(['log', '-1', '--format=%an', branch]),
      headRef: branch,
      baseRef: base,
      sha,
      ticket: found?.ticket,
      labels: [],
      changedFiles: git(['diff', '--name-only', mergeBase, sha])
        .split('\n')
        .filter(Boolean),
    },
    patch: git(['diff', mergeBase, sha]),
    body: git(['log', '--format=%h %s', `${mergeBase}..${sha}`]),
    paired:
      found && config.pairedRepo
        ? pairedChange(found.number, config.pairedRepo)
        : undefined,
  };
};
