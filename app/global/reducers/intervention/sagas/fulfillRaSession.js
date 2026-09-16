import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { RoutePath } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';
import { parametrizeRoutePath } from 'utils/router';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { FULFILL_RA_SESSION_REQUEST } from '../constants';
import {
  fulfillRaSessionSuccess,
  fulfillRaSessionError,
  fetchPredefinedParticipantsRequest,
} from '../actions';
import messages from '../messages';

export function* fulfillRaSession({ payload: { slug } }) {
  const requestUrl = `/v1/predefined_participants/${slug}/ra_session`;

  try {
    const {
      data: { data: responseData },
    } = yield call(axios.post, requestUrl);

    const {
      already_completed: alreadyCompleted,
      user_session_id: userSessionId,
      session_id: sessionId,
      intervention_id: interventionId,
      health_clinic_id: healthClinicId,
      lang,
    } = responseData;

    if (alreadyCompleted) {
      yield call(toast.info, formatMessage(messages.raSessionAlreadyCompleted));
      yield put(fulfillRaSessionSuccess());
      yield put(fetchPredefinedParticipantsRequest(interventionId));
      return;
    }

    yield put(fulfillRaSessionSuccess());

    const fillPath = parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
      interventionId,
      sessionId,
    });

    const queryParams = new URLSearchParams({ lang });
    if (healthClinicId) {
      queryParams.append('cid', healthClinicId);
    }
    queryParams.append('userSessionId', userSessionId);

    window.open(`${fillPath}?${queryParams}`, '_blank');
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.fulfillRaSessionError),
    );
    yield put(fulfillRaSessionError(error));
  }
}

export default function* fulfillRaSessionSaga() {
  yield takeLatest(FULFILL_RA_SESSION_REQUEST, fulfillRaSession);
}
