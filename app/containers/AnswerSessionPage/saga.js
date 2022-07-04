import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import merge from 'lodash/merge';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { logInGuest } from 'global/reducers/auth/sagas/logInGuest';
import LocalStorageService from 'utils/localStorageService';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { makeSelectLocation } from 'containers/App/selectors';
import { resetPhoneNumberPreview } from 'global/reducers/auth/actions';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';

import {
  SUBMIT_ANSWER_REQUEST,
  REDIRECT_TO_PREVIEW,
  RESET_SESSION,
  CREATE_USER_SESSION_REQUEST,
  NEXT_QUESTION_REQUEST,
  SAVE_QUICK_EXIT_EVENT_REQUEST,
} from './constants';
import {
  submitAnswerSuccess,
  submitAnswerFailure,
  resetAnswers,
  createUserSessionSuccess,
  createUserSessionFailure,
  nextQuestionSuccess,
  nextQuestionFailure,
  nextQuestionRequest,
  createUserSessionRequest,
  changeUserSessionId,
  setTransitionalUserSessionId,
} from './actions';
import { makeSelectAnswers, makeSelectCurrentQuestion } from './selectors';
import messages from './messages';

function* submitAnswersAsync({
  payload: { answerId, required, type: questionType, userSessionId, skipped },
}) {
  const answers = yield select(makeSelectAnswers());
  const { answerBody } = answers[answerId];
  let data = map(answerBody, (singleBody) => omit(singleBody, 'index')); // index is needed to remember the selected answers, but useless in request

  try {
    if (data.length || !required) {
      if (!data.length) {
        data = [
          {
            value: '',
            var: '',
          },
        ];
      }

      if (skipped)
        data = [
          {
            value: '',
            var: '',
          },
        ];

      const type = questionType.replace('Question', 'Answer');

      yield axios.post(
        `/v1/user_sessions/${userSessionId}/answers`,
        objectToSnakeCase({
          answer: { type, body: { data } },
          questionId: answerId,
          skipped,
        }),
      );

      yield put(submitAnswerSuccess(answerId));

      yield put(nextQuestionRequest(userSessionId));
    } else {
      throw new Error('Choose answer');
    }
  } catch (error) {
    yield put(submitAnswerFailure(answerId, error?.toString()));
  }
}

function* nextQuestion({ payload: { userSessionId, questionId } }) {
  const params = new URLSearchParams();

  const currentQuestion = yield select(makeSelectCurrentQuestion());

  if (questionId && currentQuestion === null)
    params.append('preview_question_id', questionId);

  const requestUrl = `/v1/user_sessions/${userSessionId}/questions?${params.toString()}`;

  try {
    const {
      data: {
        data,
        warning,
        next_user_session_id: newUserSessionId,
        // eslint-disable-next-line camelcase
        next_session_id,
      },
    } = yield axios.get(requestUrl);

    if (!isNullOrUndefined(warning))
      yield call(
        toast.warning,
        formatMessage(messages[warning] ?? messages.unknownWarning),
      );
    if (newUserSessionId) {
      const location = yield select(makeSelectLocation());
      const isPreview = /^.*\/preview/.test(location.pathname);

      if (isPreview) {
        yield put(setTransitionalUserSessionId(newUserSessionId));
      }
      yield put(changeUserSessionId(newUserSessionId));
    }

    yield put(
      nextQuestionSuccess(
        mapQuestionToStateObject(
          // eslint-disable-next-line camelcase
          merge(data, { attributes: { next_session_id } }),
        ),
      ),
    );
  } catch (error) {
    yield put(nextQuestionFailure(error));
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
  const { query } = yield select(makeSelectLocation());
  const requestUrl = `/v1/user_sessions`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({
        userSession: { sessionId, health_clinic_id: query.cid },
      }),
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

function* saveQuickExitEvent({ payload: { userSessionId, isPreview } }) {
  const requestUrl = `/v1/user_sessions/${userSessionId}/quick_exit`;

  const headers = objectToCamelKebabCase(
    isPreview
      ? LocalStorageService.getGuestHeaders()
      : LocalStorageService.getHeaders(),
  );

  if (!isPreview) {
    LocalStorageService.clearUserData();
  }

  yield axios.patch(requestUrl, undefined, {
    headers,
  });
}

// Individual exports for testing
export default function* AnswerSessionPageSaga() {
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
  yield takeLatest(RESET_SESSION, resetSession);
  yield takeLatest(CREATE_USER_SESSION_REQUEST, createUserSession);
  yield takeLatest(NEXT_QUESTION_REQUEST, nextQuestion);
  yield takeLatest(SAVE_QUICK_EXIT_EVENT_REQUEST, saveQuickExitEvent);
}

export function* redirectToPreviewSaga() {
  yield takeLatest(REDIRECT_TO_PREVIEW, redirectToPreview);
}
