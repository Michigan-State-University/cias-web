import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
} from 'global/reducers/questions/selectors';
import { getNarratorPositionWhenQuestionIsChanged } from 'utils/getNarratorPosition';
import { setAnimationStopPosition } from 'global/reducers/localState';
import {
  REORDER_GROUP_LIST_ERROR,
  REORDER_GROUP_LIST_REQUEST,
} from '../constants';
import {
  makeSelectQuestionGroups,
  makeSelectQuestionGroupsIds,
} from '../selectors';
import {
  cleanGroups,
  reorderGroupListError,
  reorderGroupListSuccess,
} from '../actions';

import messages from '../messages';

function* reorderQuestionGroups({ payload: { sessionId } }) {
  const groups = yield select(makeSelectQuestionGroups());
  const questions = yield select(makeSelectQuestions());
  const requestURL = `/v1/sessions/${sessionId}/question_groups/position`;

  try {
    yield axios.patch(requestURL, {
      question_group: {
        position: groups.map(({ id, position }) => ({
          id,
          position,
        })),
      },
    });

    yield put(cleanGroups(questions));
    yield put(reorderGroupListSuccess());

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
      toastId: REORDER_GROUP_LIST_ERROR,
    });
    yield put(reorderGroupListError(error));
  }
}

export default function* reorderQuestionGroupsSaga() {
  yield takeLatest(REORDER_GROUP_LIST_REQUEST, reorderQuestionGroups);
}
