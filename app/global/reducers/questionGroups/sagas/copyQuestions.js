import { takeLatest, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  makeSelectQuestionGroupsIds,
  makeSelectQuestionGroups,
} from 'global/reducers/questionGroups/selectors';
import findLast from 'lodash/findLast';
import { GroupType } from 'models/QuestionGroup';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import messages from '../messages';
import { COPY_QUESTIONS_REQUEST, COPY_QUESTIONS_ERROR } from '../constants';
import { copyQuestionsSuccess, copyQuestionsError } from '../actions';

function* copyQuestions({ payload: { questionIds, sessionId } }) {
  const requestURL = `/v1/sessions/${sessionId}/questions/clone_multiple`;
  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, { ids: questionIds });

    const copiedQuestions = data.map((question) =>
      mapQuestionToStateObject(question),
    );

    const questionGroupsIds = yield select(makeSelectQuestionGroupsIds());
    let isSameGroup = false;
    if (copiedQuestions[0])
      isSameGroup = questionGroupsIds.includes(
        copiedQuestions[0].question_group_id,
      );
    let group = null;

    if (!isSameGroup) {
      const groups = yield select(makeSelectQuestionGroups());
      const lastPlainGroup = findLast(
        groups,
        ({ type }) => type === GroupType.PLAIN,
      );
      const newGroupPosition = isNullOrUndefined(lastPlainGroup)
        ? 1
        : lastPlainGroup.position + 1;

      group = {
        id: copiedQuestions[0].question_group_id,
        title: 'Copied Questions',
        session_id: sessionId,
        position: newGroupPosition,
        questions: copiedQuestions,
      };
    }

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
