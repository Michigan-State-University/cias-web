import { all } from 'redux-saga/effects';

import registerParticipant from './registerParticipant';
import registerFromInvitation from './registerFromInvitation';

export { registerParticipant, registerFromInvitation };

export default function* allRegistrationsSaga() {
  yield all([registerParticipant(), registerFromInvitation()]);
}
