import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { formatMessage } from 'utils/intlOutsideReact';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { logInGuest } from 'global/reducers/auth/sagas/logInGuest';
import LocalStorageService from 'utils/localStorageService';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { makeSelectLocation } from 'containers/App/selectors';
import { resetPhoneNumberPreview } from 'global/reducers/auth/actions';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import {
  SUBMIT_ANSWER_REQUEST,
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_FAILURE,
  REDIRECT_TO_PREVIEW,
  RESET_SESSION,
  CREATE_USER_SESSION_REQUEST,
  NEXT_QUESTION_REQUEST,
} from './constants';
import {
  submitAnswerSuccess,
  submitAnswerFailure,
  phoneticPreviewSuccess,
  resetAnswers,
  createUserSessionSuccess,
  createUserSessionFailure,
  nextQuestionSuccess,
  nextQuestionFailure,
  nextQuestionRequest,
  createUserSessionRequest,
} from './actions';
import { makeSelectAnswers } from './selectors';
import messages from './messages';

function* submitAnswersAsync({
  payload: { answerId, required, type: questionType, userSessionId },
}) {
  const answers = yield select(makeSelectAnswers());
  const { answerBody } = answers[answerId];
  let data = map(answerBody, singleBody => omit(singleBody, 'index')); // index is needed to remember the selected answers, but useless in request
  if (data.length || !required) {
    if (!data.length) {
      data = [
        {
          value: '',
          var: '',
        },
      ];
    }

    const type = questionType.replace('Question', 'Answer');
    yield axios.post(
      `/v1/user_sessions/${userSessionId}/answers`,
      objectToSnakeCase({
        answer: { type, body: { data } },
        questionId: answerId,
      }),
    );

    yield put(submitAnswerSuccess(answerId));

    yield put(nextQuestionRequest(userSessionId));
  } else {
    yield put(submitAnswerFailure(answerId, 'Choose answer'));
  }
}

function* nextQuestion({ payload: { userSessionId, questionId } }) {
  const params = new URLSearchParams();

  if (questionId) params.append('preview_question_id', questionId);

  const requestUrl = `/v1/user_sessions/${userSessionId}/questions?${params.toString()}`;

  try {
    const {
      data: { data, warning },
    } = yield axios.get(requestUrl);

    if (!isNullOrUndefined(warning))
      yield call(
        toast.warning,
        formatMessage(messages[warning] ?? messages.unknownWarning),
      );

    yield put(nextQuestionSuccess(mapQuestionToStateObject(data)));
  } catch (error) {
    yield put(nextQuestionFailure(error));
  }
}

function* phoneticPreviewAsync({ payload: { text } }) {
  try {
    const {
      data: { url: mp3Url },
    } = yield axios.post(`/v1/phonetic_preview`, {
      audio: { text },
    });
    yield put(phoneticPreviewSuccess(`${process.env.API_URL}${mp3Url}`));
  } catch (error) {
    yield call(toast.error, error, {
      toastId: PHONETIC_PREVIEW_FAILURE,
    });
  }
}

function* redirectToPreview({
  payload: { interventionId, sessionId, questionId },
}) {
  yield call(logInGuest, { payload: { sessionId } });
  yield call(
    window.open,
    `/interventions/${interventionId}/sessions/${sessionId}/preview/${questionId}`,
  );
}

function* createUserSession({ payload: { sessionId } }) {
  const requestUrl = `/v1/user_sessions`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ userSession: { sessionId } }),
    );

    const mappedData = jsonApiToObject(data, 'userSession');

    yield put(createUserSessionSuccess(mappedData));
    yield put(resetPhoneNumberPreview());
  } catch (error) {
    yield put(createUserSessionFailure(error));
  }
}

function* resetSession({ payload: { sessionId } }) {
  yield call(LocalStorageService.clearGuestHeaders);
  yield call(logInGuest, { payload: { sessionId } });
  yield put(resetAnswers());
  yield call(resetPreviewUrl, sessionId);
}

function* resetPreviewUrl(sessionId) {
  const location = yield select(makeSelectLocation());
  const regex = /^.*\/preview\//;

  const url = location.pathname.match(regex)?.pop();

  if (url) yield put(push(url.slice(0, url.length - 1)));
  else yield put(createUserSessionRequest(sessionId));
}

// Individual exports for testing
export default function* AnswerSessionPageSaga() {
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
  yield takeLatest(PHONETIC_PREVIEW_REQUEST, phoneticPreviewAsync);
  yield takeLatest(RESET_SESSION, resetSession);
  yield takeLatest(CREATE_USER_SESSION_REQUEST, createUserSession);
  yield takeLatest(NEXT_QUESTION_REQUEST, nextQuestion);
}

export function* redirectToPreviewSaga() {
  yield takeLatest(REDIRECT_TO_PREVIEW, redirectToPreview);
}
