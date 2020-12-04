/* eslint-disable camelcase */
import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
} from 'global/reducers/questions/selectors';
import {
  cleanGroups,
  makeSelectQuestionGroupsIds,
} from 'global/reducers/questionGroups';
import { getNarratorPositionWhenQuestionIsChanged } from 'utils/getNarratorPosition';
import { setAnimationStopPosition } from 'global/reducers/localState';
import messages from '../messages';
import {
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_ERROR,
} from '../constants';
import {
  reorderQuestionListSuccess,
  reorderQuestionListError,
} from '../actions';

function* reorderQuestions({ payload: { sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/questions/move`;
  const questions = yield select(makeSelectQuestions());

  try {
    yield axios.patch(requestURL, {
      question: {
        position: questions.map(({ id, position, question_group_id }) => ({
          id,
          position,
          question_group_id,
        })),
      },
    });

    yield put(cleanGroups(questions));
    yield put(reorderQuestionListSuccess());

    const selectedQuestionId = yield select(makeSelectSelectedQuestionId());
    const groupIds = yield select(makeSelectQuestionGroupsIds());
    const position = getNarratorPositionWhenQuestionIsChanged(
      questions,
      selectedQuestionId,
      groupIds,
    );
    yield put(setAnimationStopPosition(position.x, position.y));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderError), {
      toastId: REORDER_QUESTION_LIST_ERROR,
    });
    yield put(reorderQuestionListError(error));
  }
}

export default function* reorderQuestionsSaga() {
  yield takeLatest(REORDER_QUESTION_LIST_REQUEST, reorderQuestions);
}
