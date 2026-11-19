import { all } from 'redux-saga/effects';

import type { WithSaga } from 'global/reducers/types';

import cancelSmsCampaign from './cancelSmsCampaign';
import createSmsCampaign from './createSmsCampaign';
import fetchSmsCampaigns from './fetchSmsCampaigns';
import fetchSmsCampaignsMeta from './fetchSmsCampaignsMeta';

export const allSmsCampaignsSagasKey = 'allSmsCampaignsSagas';

export function* allSmsCampaignsSagas() {
  yield all([
    fetchSmsCampaignsMeta(),
    fetchSmsCampaigns(),
    createSmsCampaign(),
    cancelSmsCampaign(),
  ]);
}

export const withAllSmsCampaignsSagas: WithSaga = {
  key: allSmsCampaignsSagasKey,
  saga: allSmsCampaignsSagas,
};
