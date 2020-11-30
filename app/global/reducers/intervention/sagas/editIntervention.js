import axios from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectProblem } from '../selectors';
import { editProblemSuccess } from '../actions';
import { EDIT_PROBLEM_REQUEST, EDIT_PROBLEM_ERROR } from '../constants';

export function* editIntervention() {
  const intervention = yield select(makeSelectProblem());
  const requestURL = `v1/interventions/${intervention.id}`;

  try {
    const {
      data: { data },
    } = yield call(axios.patch, requestURL, { intervention });
    const mappedData = defaultMapper(data);
    yield put(editProblemSuccess({ ...intervention, ...mappedData }));
  } catch (error) {
    yield call(toast.error, formatMessage(globalMessages.editProblemError), {
      toastId: EDIT_PROBLEM_ERROR,
    });
  }
}
export default function* editInterventionSaga() {
  yield takeLatest(EDIT_PROBLEM_REQUEST, editIntervention);
}
