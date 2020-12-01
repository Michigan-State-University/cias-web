import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

import { createInterventionSuccess } from '../actions';
import { CREATE_PROBLEM_REQUEST, CREATE_PROBLEM_ERROR } from '../constants';

export function* createIntervention() {
  const requestURL = `v1/interventions`;

  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, { name: 'New e-Intervention' });
    const mappedData = defaultMapper(data);

    yield put(createInterventionSuccess(mappedData));
    yield put(push(`/interventions/${mappedData.id}`));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.createInterventionError),
      {
        toastId: CREATE_PROBLEM_ERROR,
      },
    );
  }
}
export default function* createInterventionSaga() {
  yield takeLatest(CREATE_PROBLEM_REQUEST, createIntervention);
}
