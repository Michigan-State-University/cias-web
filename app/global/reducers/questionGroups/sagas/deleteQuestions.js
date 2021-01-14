import { takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
import { DELETE_QUESTIONS_REQUEST } from '../constants';
// import { deleteQuestionsSuccess, deleteQuestionsError } from '../actions';

// eslint-disable-next-line no-unused-vars
function* deleteQuestions({ payload: { questionIds } }) {
  // const requestURL = `v1/sessions/${sessionId}/questions/${questionId}`;

  try {
    // yield axios.delete(requestURL);
    // yield put(deleteQuestionsSuccess());
  } catch (error) {
    // yield put(
    //   showError(formatMessage(messages.deleteError), {
    //     id: DELETE_QUESTIONS_ERROR,
    //   }),
    // );
    // yield put(deleteQuestionsError(error));
  }
}

export default function* deleteQuestionsSaga() {
  yield takeLatest(DELETE_QUESTIONS_REQUEST, deleteQuestions);
}
