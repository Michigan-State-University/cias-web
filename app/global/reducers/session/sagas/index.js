import { all } from 'redux-saga/effects';
import editSessionSaga from 'global/reducers/session/sagas/editSession';
import getSessionSaga from 'global/reducers/session/sagas/getSession';

export { editSessionSaga, getSessionSaga };

export default function* allInterventionSagas() {
  yield all([editSessionSaga(), getSessionSaga()]);
}
