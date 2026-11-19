import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPredefinedParticipantsRequest } from 'global/reducers/intervention';
import {
  SMS_CAMPAIGNS_POLLING_INTERVAL,
  fetchSmsCampaignsRequest,
  makeSelectHasSmsCampaignsInProgress,
} from 'global/reducers/smsCampaigns';

/**
 * Keeps the campaign list fresh and the participant rows in sync with it.
 * Call it from a component that stays mounted across every view of the invite
 * modal (`InviteParticipantsModalContent`): the participant list and the
 * campaigns view are rendered in exclusive branches, so a view-level host
 * would stop polling exactly when the campaigns list is on screen.
 *
 * `enabled` has to cover every request this hook makes, the interval
 * included: the campaign endpoints answer 403 to anyone without edit access
 * to the intervention, and a GET 403 sends the whole app to `/no-access`.
 */
export const useSmsCampaignsPolling = (
  interventionId: string,
  enabled: boolean,
) => {
  const dispatch = useDispatch();

  const hasCampaignsInProgress = useSelector(
    makeSelectHasSmsCampaignsInProgress(),
  );

  useEffect(() => {
    if (enabled) dispatch(fetchSmsCampaignsRequest(interventionId));
  }, [interventionId, enabled]);

  // No websocket for campaigns, so poll while one is still open. Ticks on a
  // hidden tab are skipped and caught up on return.
  useEffect(() => {
    if (!enabled || !hasCampaignsInProgress) return undefined;

    const refreshIfVisible = () => {
      if (document.visibilityState !== 'visible') return;
      dispatch(fetchSmsCampaignsRequest(interventionId, true));
    };

    const intervalId = setInterval(
      refreshIfVisible,
      SMS_CAMPAIGNS_POLLING_INTERVAL,
    );
    document.addEventListener('visibilitychange', refreshIfVisible);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, [enabled, hasCampaignsInProgress, interventionId]);

  // A finished campaign changes the participants themselves, so refetch the
  // list on the in-progress -> settled edge.
  const wasInProgress = useRef(false);
  useEffect(() => {
    if (!enabled) {
      wasInProgress.current = false;
      return;
    }
    if (wasInProgress.current && !hasCampaignsInProgress) {
      dispatch(fetchPredefinedParticipantsRequest(interventionId));
    }
    wasInProgress.current = hasCampaignsInProgress;
  }, [enabled, hasCampaignsInProgress, interventionId]);
};
