import { takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
import { GROUP_QUESTIONS_REQUEST } from '../constants';
// import { groupQuestionsSuccess, groupQuestionsError } from '../actions';

function* groupQuestions({ payload: { questionIds } }) {
  console.log(questionIds);
  // const requestURL = `v1/interventions/${interventionId}/questions/${questionId}`;

  try {
    // yield axios.group(requestURL);
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
