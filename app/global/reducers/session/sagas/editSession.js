import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import pickFields from 'utils/pickFields';
import { makeSelectSessionById } from 'global/reducers/intervention';

import { EDIT_SESSION_REQUEST } from '../constants';

import { editSessionSuccess, editSessionError } from '../actions';

import { makeSelectSession } from '../selectors';

export function* editSession({ fields, payload: { sessionId } } = {}) {
  const session = sessionId
    ? yield select(makeSelectSessionById(sessionId))
    : yield select(makeSelectSession());

  const requestURL = `v1/interventions/${session.intervention_id ??
    session.interventionId}/sessions/${sessionId ?? session.id}`;

  const patchDifference = pickFields(session, fields);

  try {
    const {
      data: { data },
    } = yield call(axios.put, requestURL, { session: patchDifference });

    yield put(
      editSessionSuccess({
        ...data.attributes,
        id: data.id,
      }),
    );
  } catch (error) {
    yield put(editSessionError(error));
  }
}

export default function* editSessionSaga() {
  yield takeLatest(EDIT_SESSION_REQUEST, editSession);
}
