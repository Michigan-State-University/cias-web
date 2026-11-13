import { ActionType } from 'typesafe-actions';

import { SmsCampaign, SmsCampaignMeta } from 'models/SmsCampaign';

import * as actions from './actions';

export type SmsCampaignsAction = ActionType<typeof actions>;

export type SmsCampaignsState = {
  campaigns: SmsCampaign[];
  meta: Nullable<SmsCampaignMeta>;
  metaError: boolean;
  createErrorCodes: string[];
  /** Seconds from `Retry-After` on a 429. */
  createRetryAfter: Nullable<number>;
  cancelErrorCodes: string[];
  loaders: {
    fetchingMeta: boolean;
    fetchingCampaigns: boolean;
    creatingCampaign: boolean;
    cancellingCampaignId: Nullable<string>;
  };
};
