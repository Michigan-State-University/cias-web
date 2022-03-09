import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  EDIT_TLFB_QUESTION_ANSWER_REQUEST,
  EDIT_TLFB_QUESTION_ANSWER_ERROR,
} from '../constants';
import {
  editTlfbQuestionAnswerRequest,
  editTlfbQuestionAnswerError,
  editTlfbQuestionAnswerSuccess,
} from '../actions';
import messages from '../messages';

function* editTlfbQuestionAnswer({
  payload: { answerId, body },
}: ReturnType<typeof editTlfbQuestionAnswerRequest>) {
  const url = `/v1/tlfb/substances/${answerId}`;
  try {
    yield call(axios.patch, url, {
      body: objectToSnakeCase(body),
    });
    yield put(editTlfbQuestionAnswerSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.editTlfbQuestionAnswerError),
      {
        toastId: EDIT_TLFB_QUESTION_ANSWER_ERROR,
      },
    );
    yield put(editTlfbQuestionAnswerError());
  }
}

export function* editTlfbQuestionAnswerSaga() {
  yield takeLatest(EDIT_TLFB_QUESTION_ANSWER_REQUEST, editTlfbQuestionAnswer);
}
