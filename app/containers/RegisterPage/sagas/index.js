import { all } from 'redux-saga/effects';

import registerParticipant from './registerParticipant';
import registerResearcher from './registerResearcher';

export { registerParticipant, registerResearcher };

export default function* allRegistrationsSaga() {
  yield all([registerParticipant(), registerResearcher()]);
}
