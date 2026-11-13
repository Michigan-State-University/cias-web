import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import {
  IN_PROGRESS_SMS_CAMPAIGN_STATUSES,
  SmsCampaign,
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
 * A campaign that should already have gone out but is still `scheduled` or
 * `sending` — one scheduled for the future is not in progress yet.
 */
const isInProgress = ({ status, scheduledAt }: SmsCampaign) =>
  IN_PROGRESS_SMS_CAMPAIGN_STATUSES.includes(status) &&
  (!scheduledAt || new Date(scheduledAt).getTime() <= Date.now());

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
