import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST, GROUP_QUESTIONS_ERROR } from '../constants';
import { groupQuestionsError, groupQuestionsSuccess } from '../actions';

function* groupQuestions({ payload: { questionIds, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions_groups`;

  try {
    const { data } = yield axios.post(requestURL, {
      questions_group: {
        title: 'Group 1',
        questions: questionIds,
      },
    });
    yield put(groupQuestionsSuccess(data, questionIds));
  } catch (error) {
    console.log(error);
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
