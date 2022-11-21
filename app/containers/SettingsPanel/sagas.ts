import { all } from 'redux-saga/effects';
import {
  fetchInterventionSaga,
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  addInterventionAttachmentsSaga,
  deleteInterventionAttachmentSaga,
} from 'global/reducers/intervention';
import { WithSaga } from 'global/reducers/types';

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

export const withInterventionSettingsPageSagas: WithSaga = {
  key: 'interventionSettingPage',
  saga: interventionSettingPageSaga,
};

export { interventionSettingPageSaga, accessGiverContainerSaga };
