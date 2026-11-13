import produce from 'immer';
import isEqual from 'lodash/isEqual';
import { getType, Reducer } from 'typesafe-actions';

import { updateItemById } from 'utils/reduxUtils';

import type { WithReducer } from '../types';

import {
  cancelSmsCampaignError,
  cancelSmsCampaignRequest,
  cancelSmsCampaignSuccess,
  clearSmsCampaignErrors,
  createSmsCampaignError,
  createSmsCampaignRequest,
  createSmsCampaignSuccess,
  fetchSmsCampaignsError,
  fetchSmsCampaignsMetaError,
  fetchSmsCampaignsMetaRequest,
  fetchSmsCampaignsMetaSuccess,
  fetchSmsCampaignsRequest,
  fetchSmsCampaignsSuccess,
} from './actions';
import { SmsCampaignsAction, SmsCampaignsState } from './types';

export const smsCampaignsReducerKey = 'smsCampaigns';

export const initialState: SmsCampaignsState = {
  campaigns: [],
  meta: null,
  metaError: false,
  createErrorCodes: [],
  createRetryAfter: null,
  cancelErrorCodes: [],
  loaders: {
    fetchingMeta: false,
    fetchingCampaigns: false,
    creatingCampaign: false,
    cancellingCampaignId: null,
  },
};

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
export const smsCampaignsReducer: Reducer<
  SmsCampaignsState,
  SmsCampaignsAction
> = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(fetchSmsCampaignsMetaRequest): {
        draft.loaders.fetchingMeta = true;
        draft.metaError = false;
        break;
      }
      case getType(fetchSmsCampaignsMetaSuccess): {
        draft.loaders.fetchingMeta = false;
        draft.metaError = false;
        draft.meta = payload.meta;
        break;
      }
      case getType(fetchSmsCampaignsMetaError): {
        draft.loaders.fetchingMeta = false;
        draft.metaError = true;
        break;
      }

      case getType(fetchSmsCampaignsRequest): {
        if (!payload.silent) draft.loaders.fetchingCampaigns = true;
        break;
      }
      case getType(fetchSmsCampaignsSuccess): {
        draft.loaders.fetchingCampaigns = false;
        // Polling re-serializes the list every few seconds; assigning it
        // unconditionally would give every row a new reference and defeat the
        // `memo()` on `SmsCampaignsTableRow`. Compared against `state`, not
        // `draft`, to avoid walking immer proxies.
        if (!isEqual(state.campaigns, payload.campaigns)) {
          draft.campaigns = payload.campaigns;
        }
        break;
      }
      case getType(fetchSmsCampaignsError): {
        draft.loaders.fetchingCampaigns = false;
        break;
      }

      case getType(createSmsCampaignRequest): {
        draft.loaders.creatingCampaign = true;
        draft.createErrorCodes = [];
        draft.createRetryAfter = null;
        break;
      }
      case getType(createSmsCampaignSuccess): {
        draft.loaders.creatingCampaign = false;
        // The POST returns the invitation only; a scheduled reminder shows up
        // on the next list fetch.
        draft.campaigns = [payload.campaign, ...draft.campaigns];
        break;
      }
      case getType(createSmsCampaignError): {
        draft.loaders.creatingCampaign = false;
        draft.createErrorCodes = payload.errorCodes;
        draft.createRetryAfter = payload.retryAfter;
        break;
      }

      case getType(cancelSmsCampaignRequest): {
        draft.loaders.cancellingCampaignId = payload.campaignId;
        draft.cancelErrorCodes = [];
        break;
      }
      case getType(cancelSmsCampaignSuccess): {
        draft.loaders.cancellingCampaignId = null;
        const { campaign } = payload;
        updateItemById(draft.campaigns, campaign.id, campaign);
        break;
      }
      case getType(cancelSmsCampaignError): {
        draft.loaders.cancellingCampaignId = null;
        draft.cancelErrorCodes = payload.errorCodes;
        break;
      }

      case getType(clearSmsCampaignErrors): {
        // Also the meta error: it is dispatched when the compose view closes,
        // and a stale flag would flash the error state on the next open.
        draft.metaError = false;
        draft.createErrorCodes = [];
        draft.createRetryAfter = null;
        draft.cancelErrorCodes = [];
        break;
      }
    }
  });

export const withSmsCampaignsReducer: WithReducer = {
  key: smsCampaignsReducerKey,
  // @ts-ignore
  reducer: smsCampaignsReducer,
};
