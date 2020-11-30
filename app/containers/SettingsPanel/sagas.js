import { all } from 'redux-saga/effects';
import {
  fetchInterventionSaga,
  changeAccessSettingSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
} from 'global/reducers/intervention';

function* problemSettingPageSaga() {
  yield all([fetchInterventionSaga(), changeAccessSettingSaga()]);
}

function* accessGiverContainerSaga() {
  yield all([
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
  ]);
}

export { problemSettingPageSaga, accessGiverContainerSaga };
