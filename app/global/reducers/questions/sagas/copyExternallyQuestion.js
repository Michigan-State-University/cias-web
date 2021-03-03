import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { mapCopiedExternallyQuestion } from 'utils/mapResponseObjects';
import {
  copyExternallyQuestionError,
  copyExternallyQuestionSuccess,
} from 'global/reducers/questions/actions';
import { makeSelectSession } from 'global/reducers/session';

import { COPY_EXTERNALLY_QUESTION_REQUEST } from '../constants';

function* copyExternallyQuestion({
  payload: { sessionId, groupId, questionsId, copied },
}) {
  const requestURL = `/v1/sessions/${sessionId}/question_groups/${groupId}/share`;
  try {
    const {
      data: { questions },
    } = yield call(axios.post, requestURL, {
      question_group: {
        question_ids: [...(questionsId ?? [])],
        question_group_ids: [],
      },
    });

    const responseQuestion = questions[questions.length - 1];
    const session = yield select(makeSelectSession());
    yield put(
      copyExternallyQuestionSuccess(
        mapCopiedExternallyQuestion(copied, responseQuestion),
        sessionId === session.id,
      ),
    );
  } catch (error) {
    yield put(copyExternallyQuestionError(error));
  }
}

export default function* copyExternallyQuestionSaga() {
  yield takeLatest(COPY_EXTERNALLY_QUESTION_REQUEST, copyExternallyQuestion);
}
