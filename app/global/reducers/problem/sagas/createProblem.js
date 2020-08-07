import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { error as showError } from 'react-toastify-redux';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

import { createProblemSuccess } from '../actions';
import { CREATE_PROBLEM_REQUEST, CREATE_PROBLEM_ERROR } from '../constants';

function* createProblem() {
  const requestURL = `v1/problems`;

  try {
    const {
      data: { data },
    } = yield axios.post(requestURL, { name: 'New e-Intervention' });
    const mappedData = defaultMapper(data);

    yield put(createProblemSuccess(mappedData));
    yield put(push(`/interventions/${mappedData.id}`));
  } catch (error) {
    yield put(
      showError(formatMessage(globalMessages.createProblemError), {
        id: CREATE_PROBLEM_ERROR,
      }),
    );
  }
}
export default function* createProblemSaga() {
  yield takeLatest(CREATE_PROBLEM_REQUEST, createProblem);
}
