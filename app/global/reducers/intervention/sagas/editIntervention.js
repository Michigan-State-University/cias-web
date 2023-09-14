import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import orderBy from 'lodash/orderBy';

import globalMessages from 'global/i18n/globalMessages';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import getErrorFlag from 'utils/getErrorFlag';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { editInterventionError, editInterventionSuccess } from '../actions';
import {
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_ERROR,
  EDIT_INTERVENTION_SUCCESS,
} from '../constants';

function* refetchInterventionSessions(interventionId) {
  const refetchSessionsRequestUrl = `v1/interventions/${interventionId}/sessions`;
  try {
    const { data } = yield call(axios.get, refetchSessionsRequestUrl);
    const mappedSessions = jsonApiToArray(data, 'session');
    return orderBy(mappedSessions, 'position');
  } catch (e) {
    return null;
  }
}

export function* editIntervention({ payload: { intervention, extraOptions } }) {
  const requestURL = `v1/interventions/${intervention.id}`;

  try {
    yield call(axios.patch, requestURL, objectToSnakeCase({ intervention }));

    let updatedSessions = null;

    const isModifyingAccess = 'sharedTo' in intervention;
    if (isModifyingAccess) {
      updatedSessions = yield call(
        refetchInterventionSessions,
        intervention.id,
      );
    }

    yield put(editInterventionSuccess(updatedSessions));

    if (extraOptions?.onSuccess) {
      extraOptions.onSuccess();
    }
    if (extraOptions?.successMessage) {
      yield call(toast.success, extraOptions?.successMessage, {
        toastId: EDIT_INTERVENTION_SUCCESS,
      });
    }
  } catch (error) {
    const errorFlag = getErrorFlag(error);
    yield call(
      toast.error,
      error?.response?.data?.message ||
        formatMessage(globalMessages[errorFlag || 'editInterventionError']),
      {
        toastId: EDIT_INTERVENTION_ERROR,
      },
    );
    yield put(editInterventionError(error));
  }
}

export default function* editInterventionSaga() {
  yield takeEvery(EDIT_INTERVENTION_REQUEST, editIntervention);
}
