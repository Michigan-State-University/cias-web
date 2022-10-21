import { all } from 'redux-saga/effects';

import { WithSaga } from 'global/reducers/types';

import { showNotificationToastSaga } from './showNotificationToast';

export const allNotificationsSagaKey = 'allNotificationsSagas';

function* allNotificationsSaga() {
  yield all([showNotificationToastSaga()]);
}

export const withAllNotificationsSagas: WithSaga = {
  key: allNotificationsSagaKey,
  saga: allNotificationsSaga,
};
