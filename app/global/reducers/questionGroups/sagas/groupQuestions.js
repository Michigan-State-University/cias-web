import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectVisibleGroupsSize } from 'global/reducers/questions/selectors';
import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST, GROUP_QUESTIONS_ERROR } from '../constants';
import { groupQuestionsError, groupQuestionsSuccess } from '../actions';

function* groupQuestions({ payload: { questionIds, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/question_groups`;
  const groupsLength = yield select(makeSelectVisibleGroupsSize());

  try {
    const { data } = yield axios.post(requestURL, {
      question_group: {
        title: `Group ${groupsLength}`,
        questions: questionIds,
        position: groupsLength,
      },
    });
    yield put(groupQuestionsSuccess(data, questionIds));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.groupError), {
        id: GROUP_QUESTIONS_ERROR,
      }),
    );
    yield put(groupQuestionsError(error));
  }
}

export default function* groupQuestionsSaga() {
  yield takeLatest(GROUP_QUESTIONS_REQUEST, groupQuestions);
}
