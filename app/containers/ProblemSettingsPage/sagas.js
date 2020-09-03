import { all } from 'redux-saga/effects';
import {
  fetchProblemSaga,
  changeAccessSettingSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
} from 'global/reducers/problem';

function* problemSettingPageSaga() {
  yield all([fetchProblemSaga(), changeAccessSettingSaga()]);
}

function* accessGiverContainerSaga() {
  yield all([
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
  ]);
}

export { problemSettingPageSaga, accessGiverContainerSaga };
