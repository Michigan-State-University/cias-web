import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { WithSaga } from 'global/reducers/types';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  starInterventionError,
  starInterventionRequest,
  starInterventionSuccess,
} from '../actions';
import messages from '../messages';
import { STAR_INTERVENTION_REQUEST } from '../constants';

function* starIntervention({
  payload: { interventionId },
}: ReturnType<typeof starInterventionRequest>) {
  const url = `v1/interventions/${interventionId}/star`;

  try {
    yield call(axios.post, url);
    yield put(starInterventionSuccess(interventionId));
  } catch (error) {
    yield put(starInterventionError(error));
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.starInterventionError),
    );
  }
}

function* starInterventionSaga() {
  yield takeEvery(STAR_INTERVENTION_REQUEST, starIntervention);
}

export const withStarInterventionSaga: WithSaga = {
  key: 'starIntervention',
  saga: starInterventionSaga,
};
