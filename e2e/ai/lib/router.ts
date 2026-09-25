import { randomBytes } from 'crypto';

// Pure: routes from the event payload alone; checks that need the GitHub API happen in the named handler.

export type RouteDecision =
  | { action: 'generate'; pr: number; reason: string }
  | { action: 'approve'; pr: number; commenter: string; reason: string }
  | {
      action: 'regenerate';
      pr: number;
      commenter: string;
      notes: string;
      reason: string;
    }
  | { action: 'decline'; pr: number; commenter: string; reason: string }
  | { action: 'check-scenarios'; pr: number; reason: string }
  | { action: 'sweep'; reason: string }
  | { action: 'ignore'; reason: string };

export type RouteOptions = {
  baseBranch: string;
  branchPrefix: string;
  autoEnabled: boolean;
};

type User = { login?: string; type?: string };

type PullRequest = {
  number: number;
  merged?: boolean;
  head?: { ref?: string };
  base?: { ref?: string };
};

type Payload = {
  action?: string;
  sender?: User;
  pull_request?: PullRequest;
  issue?: { number: number; pull_request?: object };
  comment?: { body?: string; user?: User; author_association?: string };
  inputs?: { pr?: string };
};

const WRITER_ASSOCIATIONS = ['OWNER', 'MEMBER', 'COLLABORATOR'];

const ignore = (reason: string): RouteDecision => ({
  action: 'ignore',
  reason,
});

const routePullRequest = (
  payload: Payload,
  options: RouteOptions,
): RouteDecision => {
  const pr = payload.pull_request;
  if (!pr) return ignore('pull_request event without a pull request');
  const headRef = pr.head?.ref ?? '';
  const ours = headRef.startsWith(options.branchPrefix);

  if (payload.action === 'synchronize') {
    // The pipeline's own pushes (codegen's commit) come from its GitHub App.
    if (payload.sender?.type === 'Bot')
      return ignore(`push by ${payload.sender.login}`);
    return ours
      ? {
          action: 'check-scenarios',
          pr: pr.number,
          reason: `push to ${headRef}`,
        }
      : ignore('push to a PR the pipeline did not open');
  }

  if (payload.action !== 'closed')
    return ignore(`pull_request ${payload.action} is not a trigger`);
  if (!pr.merged) return ignore(`#${pr.number} was closed without merging`);
  if (pr.base?.ref !== options.baseBranch) {
    return ignore(
      `#${pr.number} merged into ${pr.base?.ref}, not ${options.baseBranch}`,
    );
  }
  if (ours) return ignore(`#${pr.number} is the pipeline's own PR`);
  if (!options.autoEnabled)
    return ignore('automatic trigger is off (E2E_AI_AUTO)');

  return {
    action: 'generate',
    pr: pr.number,
    reason: `#${pr.number} merged into ${options.baseBranch}`,
  };
};

const routeComment = (payload: Payload): RouteDecision => {
  const issue = payload.issue;
  const comment = payload.comment;
  if (payload.action !== 'created') return ignore(`comment ${payload.action}`);
  if (!issue?.pull_request) return ignore('comment on an issue, not a PR');
  if (!comment) return ignore('issue_comment event without a comment');

  const [firstLine = '', ...rest] = (comment.body ?? '').trim().split('\n');
  const match = firstLine
    .trim()
    .match(/^\/e2e\s+(approve|regenerate|decline)\b\s*(.*)$/i);
  if (!match) return ignore('not an /e2e command');

  const commenter = comment.user?.login ?? '';
  if (comment.user?.type === 'Bot')
    return ignore(`/e2e command from bot ${commenter}`);
  if (!WRITER_ASSOCIATIONS.includes(comment.author_association ?? '')) {
    return ignore(
      `${commenter} is not a repo member (${comment.author_association})`,
    );
  }

  const command = match[1].toLowerCase();
  const reason = `/e2e ${command} by ${commenter}`;
  if (command === 'approve')
    return { action: 'approve', pr: issue.number, commenter, reason };
  if (command === 'decline')
    return { action: 'decline', pr: issue.number, commenter, reason };
  const notes = [match[2], ...rest].join('\n').trim();
  return { action: 'regenerate', pr: issue.number, commenter, notes, reason };
};

const routeDispatch = (payload: Payload): RouteDecision => {
  const pr = Number(payload.inputs?.pr);
  if (!Number.isInteger(pr) || pr <= 0)
    return ignore(
      `workflow_dispatch needs a PR number, got "${payload.inputs?.pr}"`,
    );
  return { action: 'generate', pr, reason: `manual run for #${pr}` };
};

export const routeEvent = (
  eventName: string,
  payload: Payload,
  options: RouteOptions,
): RouteDecision => {
  switch (eventName) {
    case 'pull_request':
      return routePullRequest(payload, options);
    case 'issue_comment':
      return routeComment(payload);
    case 'workflow_dispatch':
      return routeDispatch(payload);
    case 'schedule':
      return { action: 'sweep', reason: 'daily sweep of stale drafts' };
    default:
      return ignore(`${eventName} is not a trigger`);
  }
};

// Comment text is untrusted: a random delimiter stops it ending a value early and injecting an output.
export const githubOutputs = (
  decision: RouteDecision,
  delimiter = `E2E_AI_${randomBytes(12).toString('hex')}`,
): string => {
  const values: Record<string, string> = {
    action: decision.action,
    pr: 'pr' in decision ? String(decision.pr) : '',
    commenter: 'commenter' in decision ? decision.commenter : '',
    notes: 'notes' in decision ? decision.notes : '',
    reason: decision.reason,
  };
  return Object.entries(values)
    .map(([key, value]) => `${key}<<${delimiter}\n${value}\n${delimiter}\n`)
    .join('');
};
