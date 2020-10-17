import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { Roles } from 'models/User/UserRoles';
import { FETCH_INTERVENTIONS_REQUEST } from '../constants';
import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';

function* fetchInterventions({ payload: { role } }) {
  let requestURL = `v1/interventions`;
  if (role === Roles.participant) requestURL = `v1/problems`;

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);
    yield put(fetchInterventionsSuccess(data));
  } catch (error) {
    yield put(fetchInterventionsError(error));
  }
}

export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
