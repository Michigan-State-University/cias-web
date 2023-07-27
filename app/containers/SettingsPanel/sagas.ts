import { all } from 'redux-saga/effects';
import {
  giveUserAccessSaga,
  fetchUsersWithAccessSaga,
  revokeUserAccessSaga,
  addInterventionAttachmentsSaga,
  deleteInterventionAttachmentSaga,
} from 'global/reducers/intervention';
import { WithSaga } from 'global/reducers/types';

function* interventionSettingPageSaga() {
  yield all([
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
