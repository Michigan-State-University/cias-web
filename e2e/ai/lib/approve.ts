import { canWrite, type DraftPr } from './github';
import type { RunState } from './manifest';

// The router already filtered bots and non-members from the payload; this re-checks against the GitHub API.

export type ApprovalCheck =
  | { ok: true; runId: string }
  | { ok: false; reason: string };

export const checkApproval = (input: {
  pr: DraftPr;
  approver: string;
  permission: string;
  runState: RunState;
  scenariosChangedSinceApproval?: boolean;
  branchPrefix: string;
}): ApprovalCheck => {
  const { pr, approver, permission, runState, branchPrefix } = input;
  if (pr.state !== 'OPEN')
    return { ok: false, reason: `#${pr.number} is ${pr.state.toLowerCase()}` };
  if (!pr.headRefName.startsWith(branchPrefix)) {
    return {
      ok: false,
      reason: `#${pr.number} is not a pipeline PR (${pr.headRefName})`,
    };
  }
  if (!canWrite(permission)) {
    return {
      ok: false,
      reason: `${approver} can't approve: needs write access, has ${permission || 'none'}`,
    };
  }
  const runId = pr.headRefName.slice(branchPrefix.length);
  if (runState === 'awaiting-approval') return { ok: true, runId };
  if (runState === 'ready-for-review') {
    return input.scenariosChangedSinceApproval
      ? { ok: true, runId }
      : {
          ok: false,
          reason:
            'the specs were already generated from these scenarios — edit scenarios.md first to regenerate them',
        };
  }
  // A second /e2e approve while codegen is still running lands here.
  return { ok: false, reason: `the run is ${runState}, not awaiting approval` };
};
