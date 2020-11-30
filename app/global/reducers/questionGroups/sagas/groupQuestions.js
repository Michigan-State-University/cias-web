import findLast from 'lodash/findLast';
import omit from 'lodash/omit';
import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
} from 'global/reducers/questions/selectors';
import {
  DefaultGroupType,
  PlainGroupType,
} from 'models/Intervention/GroupTypes';

import { getNarratorPositionWhenQuestionIsChanged } from 'utils/getNarratorPosition';
import { setAnimationStopPosition } from 'global/reducers/localState';
import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST, GROUP_QUESTIONS_ERROR } from '../constants';
import {
  makeSelectQuestionGroups,
  makeSelectQuestionGroupsIds,
} from '../selectors';
import {
  cleanGroups,
  groupQuestionsError,
  groupQuestionsSuccess,
} from '../actions';

function* groupQuestions({ payload: { questionIds, sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/question_groups`;
  const groups = yield select(makeSelectQuestionGroups());
  const lastPlainGroup = findLast(
    groups,
    ({ type }) => type === PlainGroupType,
  );
  const defaultGroup = findLast(
    groups,
    ({ type }) => type === DefaultGroupType,
  );

  const newGroupPosition = isNullOrUndefined(lastPlainGroup)
    ? defaultGroup.position + 1
    : lastPlainGroup.position + 1;

  try {
    const { data: group } = yield axios.post(requestURL, {
      question_group: {
        title: `Group ${newGroupPosition}`,
        questions: questionIds,
        type: PlainGroupType,
      },
    });

    const groupWithoutQuestions = omit(group, 'questions');
    yield put(groupQuestionsSuccess(groupWithoutQuestions, questionIds));

    const questions = yield select(makeSelectQuestions());
    yield put(cleanGroups(questions));

    const selectedQuestionId = yield select(makeSelectSelectedQuestionId());
    const groupIds = yield select(makeSelectQuestionGroupsIds());
    const position = getNarratorPositionWhenQuestionIsChanged(
      questions,
      selectedQuestionId,
      groupIds,
    );
    yield put(setAnimationStopPosition(position.x, position.y));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.groupError), {
      toastId: GROUP_QUESTIONS_ERROR,
    });
    yield put(groupQuestionsError(error));
  }
}

export default function* groupQuestionsSaga() {
  yield takeLatest(GROUP_QUESTIONS_REQUEST, groupQuestions);
}
