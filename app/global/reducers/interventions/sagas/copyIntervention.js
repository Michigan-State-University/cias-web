import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { setUsersItemsState, UserItemState } from 'global/reducers/userList';

import messages from '../messages';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
  COPY_INTERVENTION_SUCCESS,
} from '../constants';

export function* copyIntervention({
  payload: { interventionId, emails, ids },
}) {
  const requestURL = `v1/interventions/${interventionId}/clone`;
  let params;
  if (emails) params = { intervention: { emails } };

  if (ids) {
    yield put(setUsersItemsState(ids, UserItemState.LOADING));
  }
  try {
    yield call(axios.post, requestURL, params);

    const successMessage = emails
      ? messages.copySuccess
      : messages.duplicateSuccess;

    if (ids) {
      yield put(setUsersItemsState(ids, UserItemState.SUCCESS));
    } else {
      yield call(
        toast.info,
        formatMessage(successMessage, {
          userCount: emails?.length,
        }),
        {
          toastId: `${COPY_INTERVENTION_SUCCESS}_${Boolean(emails)}`,
        },
      );
    }
  } catch (error) {
    const errorMessage = emails ? messages.copyError : messages.duplicateError;
    yield call(toast.error, formatMessage(errorMessage), {
      toastId: `${COPY_INTERVENTION_ERROR}_${Boolean(emails)}`,
    });
    if (ids) {
      yield put(setUsersItemsState(ids, UserItemState.IDLE));
    }
  }
}

export default function* copyInterventionSaga() {
  yield takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention);
}
