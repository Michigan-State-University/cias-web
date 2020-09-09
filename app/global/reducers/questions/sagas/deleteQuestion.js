import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { DELETE_QUESTION_REQUEST, DELETE_QUESTION_ERROR } from '../constants';
import { deleteQuestionSuccess, deleteQuestionError } from '../actions';

function* deleteQuestion({ payload: { questionId, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/${questionId}`;

  try {
    yield axios.delete(requestURL);

    yield put(deleteQuestionSuccess());
  } catch (error) {
    yield put(
      showError(formatMessage(messages.deleteError), {
        id: DELETE_QUESTION_ERROR,
      }),
    );
    yield put(deleteQuestionError(error));
  }
}

export default function* deleteQuestionSaga() {
  yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion);
}
