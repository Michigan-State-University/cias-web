import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  makeSelectQuestions,
  makeSelectVisibleGroupsSize,
} from 'global/reducers/questions/selectors';
import { PlainGroupType } from 'models/Intervention/GroupTypes';
import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST, GROUP_QUESTIONS_ERROR } from '../constants';
import {
  cleanGroups,
  groupQuestionsError,
  groupQuestionsSuccess,
} from '../actions';

function* groupQuestions({ payload: { questionIds, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/question_groups`;
  const groupsLength = yield select(makeSelectVisibleGroupsSize());
  const newGroupPosition = groupsLength - 1; // subtract Finish Group

  try {
    const { data } = yield axios.post(requestURL, {
      question_group: {
        title: `Group ${newGroupPosition}`,
        questions: questionIds,
        type: PlainGroupType,
      },
    });

    yield put(groupQuestionsSuccess(data, questionIds));

    const questions = yield select(makeSelectQuestions());
    yield put(cleanGroups(questions));
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
