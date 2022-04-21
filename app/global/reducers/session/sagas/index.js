import { all } from 'redux-saga/effects';
import editSessionSaga from 'global/reducers/session/sagas/editSession';
import getSessionSaga from 'global/reducers/session/sagas/getSession';
import bulkEditSession from 'global/reducers/session/sagas/bulkEditSession';

export { editSessionSaga, getSessionSaga, bulkEditSession };

export default function* allInterventionSagas() {
  yield all([editSessionSaga(), getSessionSaga(), bulkEditSession()]);
}
