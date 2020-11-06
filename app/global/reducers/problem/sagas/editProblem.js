import axios from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectProblem } from '../selectors';
import { editProblemSuccess } from '../actions';
import { EDIT_PROBLEM_REQUEST, EDIT_PROBLEM_ERROR } from '../constants';

export function* editProblem() {
  const problem = yield select(makeSelectProblem());
  const requestURL = `v1/problems/${problem.id}`;

  try {
    const {
      data: { data },
    } = yield call(axios.patch, requestURL, { problem });
    const mappedData = defaultMapper(data);
    yield put(editProblemSuccess({ ...problem, ...mappedData }));
  } catch (error) {
    yield call(toast.error, formatMessage(globalMessages.editProblemError), {
      toastId: EDIT_PROBLEM_ERROR,
    });
  }
}
export default function* editProblemSaga() {
  yield takeLatest(EDIT_PROBLEM_REQUEST, editProblem);
}
