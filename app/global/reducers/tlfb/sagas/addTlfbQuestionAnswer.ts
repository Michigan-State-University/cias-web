import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';
import { fullDayToYearFormatter } from 'utils/formatters';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import {
  addTlfbQuestionAnswerRequest,
  addTlfbQuestionAnswerError,
  addTlfbQuestionAnswerSuccess,
} from '../actions';

import {
  ADD_TLFB_QUESTION_ANSWER_REQUEST,
  ADD_TLFB_QUESTION_ANSWER_ERROR,
} from '../constants';
import messages from '../messages';

function* addTlfbQuestionAnswer({
  payload: { userSessionId, dayKey, questionGroupId, body },
}: ReturnType<typeof addTlfbQuestionAnswerRequest>) {
  const url = `/v1/tlfb/consumption_results`;
  try {
    const date = dayjs(dayKey, fullDayToYearFormatter).utc(true);

    const { data } = yield call(axios.post, url, {
      exact_date: date.toISOString(),
      user_session_id: userSessionId,
      question_group_id: questionGroupId,
      body: objectToSnakeCase(body),
    });

    const newAnswer = jsonApiToObject(data, 'consumptionResult');

    yield put(addTlfbQuestionAnswerSuccess(newAnswer, dayKey));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.addTlfbQuestionAnswerError),
      {
        toastId: ADD_TLFB_QUESTION_ANSWER_ERROR,
      },
    );
    yield put(addTlfbQuestionAnswerError());
  }
}

export function* addTlfbQuestionAnswerSaga() {
  yield takeLatest(ADD_TLFB_QUESTION_ANSWER_REQUEST, addTlfbQuestionAnswer);
}
