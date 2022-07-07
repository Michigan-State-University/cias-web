import { all } from 'redux-saga/effects';

import fetchNavigatorSetup from './fetchNavigatorSetup';
import updateNavigatorSetup from './updateNavigatorSetup';
import addParticipantLink from './addParticipantLink';
import updateParticipantLink from './updateParticipantLink';
import removeParticipantLink from './removeParticipantLink';
import inviteNavigatorByEmail from './inviteNavigatorByEmail';
import removeNavigatorEmailInvitation from './removeNavigatorEmailInvitation';
import removeInterventionNavigator from './removeInterventionNavigator';

export function* allNavigatorSetupSagas() {
  yield all([
    fetchNavigatorSetup(),
    updateNavigatorSetup(),
    addParticipantLink(),
    updateParticipantLink(),
    removeParticipantLink(),
    inviteNavigatorByEmail(),
    removeNavigatorEmailInvitation(),
    removeInterventionNavigator(),
  ]);
}
