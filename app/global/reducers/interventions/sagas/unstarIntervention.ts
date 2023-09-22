import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { WithSaga } from 'global/reducers/types';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  unstarInterventionError,
  unstarInterventionRequest,
  unstarInterventionSuccess,
} from '../actions';
import messages from '../messages';
import { UNSTAR_INTERVENTION_REQUEST } from '../constants';

function* unstarIntervention({
  payload: { interventionId },
}: ReturnType<typeof unstarInterventionRequest>) {
  const url = `v1/interventions/${interventionId}/star`;

  try {
    yield call(axios.delete, url);
    yield put(unstarInterventionSuccess(interventionId));
  } catch (error) {
    yield put(unstarInterventionError(error));
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.unstarInterventionError),
    );
  }
}

function* unstarInterventionSaga() {
  yield takeEvery(UNSTAR_INTERVENTION_REQUEST, unstarIntervention);
}

export const withUnstarInterventionSaga: WithSaga = {
  key: 'unstarIntervention',
  saga: unstarInterventionSaga,
};
