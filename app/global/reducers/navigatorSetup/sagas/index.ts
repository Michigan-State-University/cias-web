import { all } from 'redux-saga/effects';

import fetchNavigatorSetup from './fetchNavigatorSetup';
import updateNoNavigatorsTab from './updateNoNavigatorsTab';
import addParticipantLink from './addParticipantLink';
import updateParticipantLink from './updateParticipantLink';
import removeParticipantLink from './removeParticipantLink';
import inviteNavigatorByEmail from './inviteNavigatorByEmail';
import removeNavigatorEmailInvitation from './removeNavigatorEmailInvitation';
import removeInterventionNavigator from './removeInterventionNavigator';
import addParticipantFile from './addParticipantFile';
import removeParticipantFile from './removeParticipantFile';
import addNavigatorFile from './addNavigatorFile';
import removeNavigatorFile from './removeNavigatorFile';
import addNavigatorLink from './addNavigatorLink';
import updateNavigatorLink from './updateNavigatorLink';
import removeNavigatorLink from './removeNavigatorLink';

export function* allNavigatorSetupSagas() {
  yield all([
    fetchNavigatorSetup(),
    updateNoNavigatorsTab(),
    addParticipantLink(),
    updateParticipantLink(),
    removeParticipantLink(),
    inviteNavigatorByEmail(),
    removeNavigatorEmailInvitation(),
    removeInterventionNavigator(),
    addParticipantFile(),
    removeParticipantFile(),
    addNavigatorFile(),
    removeNavigatorFile(),
    addNavigatorLink(),
    updateNavigatorLink(),
    removeNavigatorLink(),
  ]);
}
