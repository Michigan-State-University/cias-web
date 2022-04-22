import { all } from 'redux-saga/effects';
import {
  fetchInterventionSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  addInterventionAttachmentsSaga,
  deleteInterventionAttachmentSaga,
} from 'global/reducers/intervention';

function* interventionSettingPageSaga() {
  yield all([
    fetchInterventionSaga(),
    addInterventionAttachmentsSaga(),
    deleteInterventionAttachmentSaga(),
  ]);
}

function* accessGiverContainerSaga() {
  yield all([
    giveUserAccessSaga(),
    fetchUsersWithAccessSaga(),
    revokeUserAccessSaga(),
  ]);
}

export { interventionSettingPageSaga, accessGiverContainerSaga };
