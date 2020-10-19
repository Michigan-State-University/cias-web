import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import { mapGroupsToQuestions } from 'global/reducers/questionGroups/utils';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import { setAnimationStopPosition } from 'global/reducers/localState';
import messages from '../messages';
import {
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_ERROR,
} from '../constants';
import {
  reorderQuestionListSuccess,
  reorderQuestionListError,
  getQuestionsSuccess,
} from '../actions';

function* reorderQuestions({
  payload: { questionId, sourceGroupId, destinationGroupId, destinationIndex },
}) {
  const requestURL = `v1/question_groups/${sourceGroupId}/questions/${questionId}/move`;

  try {
    const {
      data: { question_groups: groups },
    } = yield axios.patch(requestURL, {
      question: {
        position: destinationIndex + 1,
        question_group_id: destinationGroupId,
      },
    });

    const questions = mapGroupsToQuestions(groups);
    const sortedQuestions = sortBy(questions, 'position');
    yield put(getQuestionsSuccess(sortedQuestions));
    if (!isEmpty(sortedQuestions) && sortedQuestions[0].narrator.blocks[0]) {
      const position = sortedQuestions[0].narrator.blocks[0].endPosition;
      yield put(setAnimationStopPosition(position.x, position.y));
    }

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
