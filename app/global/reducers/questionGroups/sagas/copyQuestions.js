import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  mapQuestionToStateObject,
  defaultMapper,
} from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { COPY_QUESTIONS_REQUEST, COPY_QUESTIONS_ERROR } from '../constants';
import { copyQuestionsSuccess, copyQuestionsError } from '../actions';

function* copyQuestions({ payload: { questionIds, sessionId } }) {
  const requestURL = `/v1/sessions/${sessionId}/questions/clone_multiple`;
  try {
    const {
      data: { data, included },
    } = yield call(axios.post, requestURL, { ids: questionIds });

    const copiedQuestions = data.map((question) =>
      mapQuestionToStateObject(question),
    );

    const group = defaultMapper(included[0]);

    yield put(copyQuestionsSuccess(copiedQuestions, group));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_QUESTIONS_ERROR,
    });

    yield put(copyQuestionsError(error));
  }
}

export default function* copyQuestionsSaga() {
  yield takeLatest(COPY_QUESTIONS_REQUEST, copyQuestions);
}
