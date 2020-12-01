import axios from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectIntervention } from '../selectors';
import { editInterventionSuccess } from '../actions';
import {
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_ERROR,
} from '../constants';

export function* editIntervention() {
  const intervention = yield select(makeSelectIntervention());
  const requestURL = `v1/interventions/${intervention.id}`;

  try {
    const {
      data: { data },
    } = yield call(axios.patch, requestURL, { intervention });
    const mappedData = defaultMapper(data);
    yield put(editInterventionSuccess({ ...intervention, ...mappedData }));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.editInterventionError),
      {
        toastId: EDIT_INTERVENTION_ERROR,
      },
    );
  }
}
export default function* editInterventionSaga() {
  yield takeLatest(EDIT_INTERVENTION_REQUEST, editIntervention);
}
