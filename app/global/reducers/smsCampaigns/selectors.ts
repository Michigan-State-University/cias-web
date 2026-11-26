import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import {
  IN_PROGRESS_SMS_CAMPAIGN_STATUSES,
  SmsCampaign,
  SmsCampaignKind,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import { initialState } from './reducer';
import { SmsCampaignsState } from './types';

const selectSmsCampaigns = ({ smsCampaigns }: RootState): SmsCampaignsState =>
  smsCampaigns || initialState;

export const makeSelectSmsCampaignsLoader = <
  K extends keyof SmsCampaignsState['loaders'],
>(
  loaderName: K,
) => createSelector(selectSmsCampaigns, ({ loaders }) => loaders[loaderName]);

export const makeSelectSmsCampaigns = () =>
  createSelector(selectSmsCampaigns, ({ campaigns }) => campaigns);

export const makeSelectSmsCampaignsMeta = () =>
  createSelector(selectSmsCampaigns, ({ meta }) => meta);

export const makeSelectSmsCampaignsMetaError = () =>
  createSelector(selectSmsCampaigns, ({ metaError }) => metaError);

export const makeSelectCreateSmsCampaignErrorCodes = () =>
  createSelector(
    selectSmsCampaigns,
    ({ createErrorCodes }) => createErrorCodes,
  );

export const makeSelectCreateSmsCampaignRetryAfter = () =>
  createSelector(
    selectSmsCampaigns,
    ({ createRetryAfter }) => createRetryAfter,
  );

export const makeSelectCancelSmsCampaignErrorCodes = () =>
  createSelector(
    selectSmsCampaigns,
    ({ cancelErrorCodes }) => cancelErrorCodes,
  );

/**
 * A scheduled reminder still waiting for its date. Only this kind may be
 * compared with the browser clock: an immediate campaign is stamped with
 * server time, so a machine running behind would read a just-sent campaign
 * as still pending.
 */
const isAwaitingSchedule = ({ kind, status, scheduledAt }: SmsCampaign) =>
  kind === SmsCampaignKind.SCHEDULED_REMINDER &&
  status === SmsCampaignStatus.SCHEDULED &&
  !!scheduledAt &&
  new Date(scheduledAt).getTime() > Date.now();

const isInProgress = (campaign: SmsCampaign) =>
  IN_PROGRESS_SMS_CAMPAIGN_STATUSES.includes(campaign.status) &&
  !isAwaitingSchedule(campaign);

export const makeSelectHasSmsCampaignsInProgress = () =>
  createSelector(selectSmsCampaigns, ({ campaigns }) =>
    campaigns.some(isInProgress),
  );

/**
 * The campaign the summary line speaks about. The list is newest-first by
 * creation, so an open campaign wins over a more recent finished one.
 */
export const makeSelectLatestSmsCampaign = () =>
  createSelector(selectSmsCampaigns, ({ campaigns }) => {
    const open = campaigns.find(isInProgress);
    return { latest: open ?? campaigns[0], inProgress: !!open };
  });
