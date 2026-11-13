import { createAction } from 'typesafe-actions';

import {
  SmsCampaign,
  SmsCampaignData,
  SmsCampaignMeta,
} from 'models/SmsCampaign';

import {
  CANCEL_SMS_CAMPAIGN_ERROR,
  CANCEL_SMS_CAMPAIGN_REQUEST,
  CANCEL_SMS_CAMPAIGN_SUCCESS,
  CLEAR_SMS_CAMPAIGN_ERRORS,
  CREATE_SMS_CAMPAIGN_ERROR,
  CREATE_SMS_CAMPAIGN_REQUEST,
  CREATE_SMS_CAMPAIGN_SUCCESS,
  FETCH_SMS_CAMPAIGNS_ERROR,
  FETCH_SMS_CAMPAIGNS_META_ERROR,
  FETCH_SMS_CAMPAIGNS_META_REQUEST,
  FETCH_SMS_CAMPAIGNS_META_SUCCESS,
  FETCH_SMS_CAMPAIGNS_REQUEST,
  FETCH_SMS_CAMPAIGNS_SUCCESS,
} from './constants';

export const fetchSmsCampaignsMetaRequest = createAction(
  FETCH_SMS_CAMPAIGNS_META_REQUEST,
  (action) => (interventionId: string) => action({ interventionId }),
);
export const fetchSmsCampaignsMetaSuccess = createAction(
  FETCH_SMS_CAMPAIGNS_META_SUCCESS,
  (action) => (meta: SmsCampaignMeta) => action({ meta }),
);
export const fetchSmsCampaignsMetaError = createAction(
  FETCH_SMS_CAMPAIGNS_META_ERROR,
  (action) => () => action({}),
);

export const fetchSmsCampaignsRequest = createAction(
  FETCH_SMS_CAMPAIGNS_REQUEST,
  (action) =>
    /** `silent` skips the loader so polling does not flicker the list. */
    (interventionId: string, silent: boolean = false) =>
      action({ interventionId, silent }),
);
export const fetchSmsCampaignsSuccess = createAction(
  FETCH_SMS_CAMPAIGNS_SUCCESS,
  (action) => (campaigns: SmsCampaign[]) => action({ campaigns }),
);
export const fetchSmsCampaignsError = createAction(
  FETCH_SMS_CAMPAIGNS_ERROR,
  (action) => () => action({}),
);

export const createSmsCampaignRequest = createAction(
  CREATE_SMS_CAMPAIGN_REQUEST,
  (action) =>
    (interventionId: string, data: SmsCampaignData, onSuccess?: () => void) =>
      action({ interventionId, data, onSuccess }),
);
export const createSmsCampaignSuccess = createAction(
  CREATE_SMS_CAMPAIGN_SUCCESS,
  (action) => (campaign: SmsCampaign) => action({ campaign }),
);
export const createSmsCampaignError = createAction(
  CREATE_SMS_CAMPAIGN_ERROR,
  (action) =>
    /** `errorCodes` come from `getApiErrorCodesForDisplay`, never empty. */
    (errorCodes: string[], retryAfter: Nullable<number>) =>
      action({ errorCodes, retryAfter }),
);

export const cancelSmsCampaignRequest = createAction(
  CANCEL_SMS_CAMPAIGN_REQUEST,
  (action) => (interventionId: string, campaignId: string) =>
    action({ interventionId, campaignId }),
);
export const cancelSmsCampaignSuccess = createAction(
  CANCEL_SMS_CAMPAIGN_SUCCESS,
  (action) => (campaign: SmsCampaign) => action({ campaign }),
);
export const cancelSmsCampaignError = createAction(
  CANCEL_SMS_CAMPAIGN_ERROR,
  (action) => (errorCodes: string[]) => action({ errorCodes }),
);

export const clearSmsCampaignErrors = createAction(
  CLEAR_SMS_CAMPAIGN_ERRORS,
  (action) => () => action({}),
);
