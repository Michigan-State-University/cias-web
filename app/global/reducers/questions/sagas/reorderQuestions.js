import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_ERROR,
} from '../constants';
import {
  reorderQuestionListSuccess,
  reorderQuestionListError,
} from '../actions';

function* reorderQuestions({ payload: { reorderedList, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/position`;

  try {
    const list = reorderedList.map(el => ({
      id: el.id,
      position: el.position,
    }));
    yield axios.patch(requestURL, {
      question: { position: list },
    });

    yield put(reorderQuestionListSuccess());
  } catch (error) {
    yield put(
      showError(formatMessage(messages.reorderError), {
        id: REORDER_QUESTION_LIST_ERROR,
      }),
    );
    yield put(reorderQuestionListError(error));
  }
}

export default function* reorderQuestionsSaga() {
  yield takeLatest(REORDER_QUESTION_LIST_REQUEST, reorderQuestions);
}
