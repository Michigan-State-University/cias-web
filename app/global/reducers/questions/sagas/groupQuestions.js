import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST } from '../constants';
// import { groupQuestionsSuccess, groupQuestionsError } from '../actions';

function* groupQuestions({ payload: { questionIds, interventionId } }) {
  console.log(questionIds);
  const requestURL = `v1/interventions/${interventionId}/questions_groups`;

  try {
    const r = yield axios.post(requestURL, {
      title: 'Group 1',
      questions: [...questionIds],
    });
    console.log(r);
    // yield put(groupQuestionsSuccess());
  } catch (error) {
    // yield put(
    //   showError(formatMessage(messages.groupError), {
    //     id: GROUP_QUESTIONS_ERROR,
    //   }),
    // );
    // yield put(groupQuestionsError(error));
  }
}

export default function* groupQuestionsSaga() {
  yield takeLatest(GROUP_QUESTIONS_REQUEST, groupQuestions);
}
