import axios from 'axios';
import get from 'lodash/get';

import { put, takeLatest, call } from 'redux-saga/effects';
import { formatMessage } from 'utils/intlOutsideReact';

import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';
import { FETCH_INTERVENTIONS_REQUEST } from '../constants';

import messages from '../messages';

export function* fetchInterventions() {
  const requestURL = `v1/interventions`;

  try {
    const {
      data: { interventions },
    } = yield call(axios.get, requestURL);
    yield put(fetchInterventionsSuccess(interventions));
  } catch (error) {
    yield put(
      fetchInterventionsError(
        get(error, 'message', formatMessage(messages.defaultError)),
      ),
    );
  }
}
export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
