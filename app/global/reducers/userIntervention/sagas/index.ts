import { all } from 'redux-saga/effects';
import acceptInvitationSaga from './acceptInvitation';

export function* allUserInterventionSagas() {
  yield all([acceptInvitationSaga()]);
}
