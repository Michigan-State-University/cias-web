import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { DELETE_QUESTION_REQUEST, DELETE_QUESTION_ERROR } from '../constants';
import { deleteQuestionSuccess, deleteQuestionError } from '../actions';
import messages from '../messages';

function* deleteQuestion({ payload: { questionId, groupId } }) {
  const requestURL = `v1/question_groups/${groupId}/questions/${questionId}`;

  try {
    yield axios.delete(requestURL);

    yield put(deleteQuestionSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteError), {
      toastId: DELETE_QUESTION_ERROR,
    });
    yield put(deleteQuestionError(error));
  }
}

export default function* deleteQuestionSaga() {
  yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion);
}
