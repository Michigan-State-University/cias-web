import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import getErrorFlag from 'utils/getErrorFlag';

import { editInterventionError, editInterventionSuccess } from '../actions';
import {
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_ERROR,
  EDIT_INTERVENTION_SUCCESS,
} from '../constants';

export function* editIntervention({ payload: { intervention, extraOptions } }) {
  const requestURL = `v1/interventions/${intervention.id}`;

  try {
    const {
      data: { data },
    } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({ intervention }),
    );

    const mappedData = defaultMapper(data);
    yield put(editInterventionSuccess({ ...intervention, ...mappedData }));
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
