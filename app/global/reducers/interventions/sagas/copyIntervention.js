import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import messages from '../messages';
import { copyInterventionSuccess } from '../actions';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
  COPY_INTERVENTION_SUCCESS,
} from '../constants';

export function* copyIntervention({
  payload: { interventionId, users, withoutRedirect },
}) {
  const requestURL = `v1/interventions/${interventionId}/clone`;
  let params;
  if (users) params = { intervention: { user_ids: users } };
  try {
    const response = yield call(axios.post, requestURL, params);

    const copiedIntervention = jsonApiToObject(response.data, 'intervention');

    if (!params) {
      yield put(copyInterventionSuccess(copiedIntervention));
      if (!withoutRedirect) {
        yield put(push('/'));
      }
    }

    yield call(
      toast.success,
      formatMessage(messages.sendSuccess, { name: copiedIntervention.name }),
      {
        toastId: COPY_INTERVENTION_SUCCESS,
      },
    );
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_INTERVENTION_ERROR,
    });
  }
}

export default function* copyInterventionSaga() {
  yield takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention);
}
