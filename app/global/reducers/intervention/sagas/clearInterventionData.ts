import axios from 'axios';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { updateInterventionListItemById } from 'global/reducers/interventions/actions';

import messages from '../messages';
import { CLEAR_INTERVENTION_DATA_REQUEST } from '../constants';
import {
  clearInterventionDataError,
  clearInterventionDataRequest,
  clearInterventionDataSuccess,
} from '../actions';

function* clearInterventionData({
  payload: { interventionId, delay, onSuccess },
}: ReturnType<typeof clearInterventionDataRequest>) {
  const requestURL = `/v1/interventions/${interventionId}/user_data?delay=${delay}`;

  try {
    const { data } = yield call(axios.delete, requestURL);
    const { id, sensitiveDataState, clearSensitiveDataScheduledAt } =
      jsonApiToObject(data, 'intervention');
    yield put(
      clearInterventionDataSuccess(
        id,
        sensitiveDataState,
        clearSensitiveDataScheduledAt,
      ),
    );
    yield put(
      updateInterventionListItemById(interventionId, {
        sensitiveDataState,
        clearSensitiveDataScheduledAt,
      }),
    );
    onSuccess({ sensitiveDataState, clearSensitiveDataScheduledAt });
  } catch (error) {
    yield put(clearInterventionDataError());
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.clearInterventionDataError),
    );
  }
}

export function* clearInterventionDataSaga() {
  yield takeEvery(CLEAR_INTERVENTION_DATA_REQUEST, clearInterventionData);
}

export const withClearInterventionDataSaga = {
  key: 'clearInterventionDataSaga',
  saga: clearInterventionDataSaga,
};
