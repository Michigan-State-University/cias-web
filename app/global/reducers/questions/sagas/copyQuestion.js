import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { COPY_QUESTION_REQUEST, COPY_QUESTION_ERROR } from '../constants';
import { copyQuestionSuccess, copyQuestionError } from '../actions';

function* copyQuestion({ payload: { questionId } }) {
  const requestURL = `v1/questions/${questionId}/clone`;
  try {
    const response = yield axios.post(requestURL);

    const copiedQuestion = mapQuestionToStateObject(response.data.data);

    yield put(copyQuestionSuccess(copiedQuestion));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      id: COPY_QUESTION_ERROR,
    });
    yield put(copyQuestionError(error));
  }
}

export default function* copyQuestionSaga() {
  yield takeLatest(COPY_QUESTION_REQUEST, copyQuestion);
}
