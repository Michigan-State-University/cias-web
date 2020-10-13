import { takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
import { DELETE_QUESTIONS_REQUEST } from '../constants';
// import { deleteQuestionsSuccess, deleteQuestionsError } from '../actions';

function* deleteQuestions({ payload: { questionIds } }) {
  console.log(questionIds);
  // const requestURL = `v1/interventions/${interventionId}/questions/${questionId}`;

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
