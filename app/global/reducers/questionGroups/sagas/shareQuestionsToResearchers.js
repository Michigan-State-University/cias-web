import { takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { error as showError } from 'react-toastify-redux';

// import { formatMessage } from 'utils/intlOutsideReact';

// import messages from '../messages';
import { SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST } from '../constants';
// import { shareQuestionsToResearchersSuccess, shareQuestionsToResearchersError } from '../actions';

function* shareQuestionsToResearchers({
  // eslint-disable-next-line no-unused-vars
  payload: { questionIds, researcherIds },
}) {
  // const requestURL = `v1/sessions/${sessionId}/questions/${questionId}`;

  try {
    // yield axios.delete(requestURL);
    // yield put(shareQuestionsToResearchersSuccess());
  } catch (error) {
    // yield put(
    //   showError(formatMessage(messages.deleteError), {
    //     id: SHARE_QUESTIONS_TO_RESEARCHERS_ERROR,
    //   }),
    // );
    // yield put(shareQuestionsToResearchersError(error));
  }
}

export default function* shareQuestionsToResearchersSaga() {
  yield takeLatest(
    SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST,
    shareQuestionsToResearchers,
  );
}
