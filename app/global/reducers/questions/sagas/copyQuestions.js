import { takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
// import { COPY_QUESTIONS_REQUEST, COPY_QUESTIONS_ERROR } from '../constants';
import { COPY_QUESTIONS_REQUEST } from '../constants';
// import { copyQuestionsSuccess, copyQuestionsError } from '../actions';

function* copyQuestions({ payload: { questionIds } }) {
  console.log(questionIds);
  // const requestURL = `v1/questions/${questionId}/clone`;
  try {
    // const response = yield axios.post(requestURL);
    // const copiedQuestion = mapQuestionToStateObject(response.data.data);
    // yield put(copyQuestionsSuccess(copiedQuestion));
  } catch (error) {
    // yield put(
    //   showError(formatMessage(messages.copyError), {
    //     id: COPY_QUESTIONS_ERROR,
    //   }),
    // );
    // yield put(copyQuestionsError(error));
  }
}

export default function* copyQuestionsSaga() {
  yield takeLatest(COPY_QUESTIONS_REQUEST, copyQuestions);
}
