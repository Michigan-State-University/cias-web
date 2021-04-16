import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  copyExternallyQuestionError,
  copyExternallyQuestionSuccess,
} from 'global/reducers/questions/actions';
import { makeSelectSession } from 'global/reducers/session';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  COPY_EXTERNALLY_QUESTION_ERROR,
  COPY_EXTERNALLY_QUESTION_REQUEST,
  COPY_EXTERNALLY_QUESTION_SUCCESS,
} from '../constants';
import messages from '../messages';

function* copyExternallyQuestion({
  payload: { sessionId, groupId, questionsId },
}) {
  const requestURL = `/v1/sessions/${sessionId}/question_groups/${groupId}/share`;
  try {
    const { data } = yield call(axios.post, requestURL, {
      question_group: {
        question_ids: [...(questionsId ?? [])],
        question_group_ids: [],
      },
    });
    const questionGroup = jsonApiToObject(data, 'questionGroup');
    const { questions } = questionGroup;

    const responseQuestion = questions[questions.length - 1];
    const session = yield select(makeSelectSession());
    yield put(
      copyExternallyQuestionSuccess(
        objectKeysToSnakeCase(responseQuestion, ['sha256', 'endPosition']),
        sessionId === session.id,
      ),
    );
    yield call(toast.success, formatMessage(messages.copySuccess), {
      toastId: COPY_EXTERNALLY_QUESTION_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_EXTERNALLY_QUESTION_ERROR,
    });
    yield put(copyExternallyQuestionError(error));
  }
}

export default function* copyExternallyQuestionSaga() {
  yield takeLatest(COPY_EXTERNALLY_QUESTION_REQUEST, copyExternallyQuestion);
}
