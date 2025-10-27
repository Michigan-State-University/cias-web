import { takeLatest, put, select, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import { push, replace } from 'connected-react-router';
import merge from 'lodash/merge';

import { AnswerType } from 'models/Answer';

import { INTERVENTION_LANGUAGE_QUERY_KEY, RoutePath } from 'global/constants';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import LocalStorageService from 'utils/localStorageService';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { getIsPreview } from 'utils/previewMode';
import { parametrizeRoutePath } from 'utils/router';
import objectToCamelCase from 'utils/objectToCamelCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  resetPhoneNumberPreview,
  updateUsersTimezone,
} from 'global/reducers/auth/actions';
import { logInGuest } from 'global/reducers/auth/sagas/logInGuest';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';

import { makeSelectLocation } from 'containers/App/selectors';
import { changeLocale } from 'containers/AppLanguageProvider/actions';

import {
  SUBMIT_ANSWER_REQUEST,
  REDIRECT_TO_PREVIEW,
  RESET_SESSION,
  CREATE_USER_SESSION_REQUEST,
  NEXT_QUESTION_REQUEST,
  SAVE_QUICK_EXIT_EVENT_REQUEST,
  FETCH_USER_SESSION_REQUEST,
  FETCH_OR_CREATE_USER_SESSION_REQUEST,
  FETCH_PREVIOUS_QUESTION_REQUEST,
  VERIFY_PATIENT_DATA_REQUEST,
  VERIFY_QR_CODE_REQUEST,
} from './constants';
import {
  submitAnswerSuccess,
  submitAnswerFailure,
  createUserSessionSuccess,
  createUserSessionFailure,
  nextQuestionSuccess,
  nextQuestionFailure,
  nextQuestionRequest,
  changeUserSessionId,
  setTransitionalUserSessionId,
  startSession,
  fetchUserSessionSuccess,
  fetchUserSessionError,
  fetchOrCreateUserSessionSuccess,
  fetchOrCreateUserSessionError,
  resetReducer,
  fetchPreviousQuestionSuccess,
  fetchPreviousQuestionError,
  verifyPatientDataError,
  verifyPatientDataSuccess,
  submitAnswer,
  setHfhsPatientDetail,
  verifyQRCodeSuccess,
  verifyQRCodeError,
} from './actions';
import {
  makeSelectAnswers,
  makeSelectCurrentQuestion,
  makeSelectUserSession,
  makeSelectVideoStats,
} from './selectors';
import messages from './messages';
import { getInterventionNotAvailablePagePathFromApiError } from '../../components/InterventionNotAvailableInfo';

function* submitAnswersAsync({
  payload: { questionId, required, type: questionType, userSessionId, skipped },
}) {
  const answers = yield select(makeSelectAnswers());
  const allVideoStats = yield select(makeSelectVideoStats());
  let videoStats = allVideoStats[questionId];
  videoStats ??= {};
  let { answerBody: data } = answers[questionId];
  data ??= [];

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
          answer: { type, body: { data }, videoStats },
          questionId,
          skipped,
        }),
      );

      if (type === AnswerType.PHONE) {
        const isPreview = getIsPreview();
        const timezone = data[0]?.value?.timezone;
        if (!isPreview && timezone) {
          yield put(updateUsersTimezone(timezone));
        }
      }

      yield put(submitAnswerSuccess(questionId));

      yield put(nextQuestionRequest(userSessionId));
    } else {
      throw new Error('Choose answer');
    }
  } catch (error) {
    yield put(
      submitAnswerFailure(
        questionId,
        formatApiErrorMessage(error, messages.submitAnswerError),
      ),
    );
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
        data: questionData,
        warning,
        next_user_session_id: newUserSessionId,
        // eslint-disable-next-line camelcase
        next_session_id,
        answer: answerData,
        hfhs_patient_detail: hfhsPatientDetail,
      },
    } = yield axios.get(requestUrl);

    if (!isNullOrUndefined(warning))
      yield call(
        toast.warning,
        formatMessage(messages[warning] ?? messages.unknownWarning),
      );

    if (hfhsPatientDetail) {
      yield put(setHfhsPatientDetail(objectToCamelCase(hfhsPatientDetail)));
    }

    if (newUserSessionId) {
      const isPreview = getIsPreview();

      if (isPreview) {
        yield put(setTransitionalUserSessionId(newUserSessionId));
      }
      yield put(changeUserSessionId(newUserSessionId));
    }

    const question = mapQuestionToStateObject(
      // eslint-disable-next-line camelcase
      merge(questionData, { attributes: { next_session_id } }),
    );
    const answer = answerData
      ? jsonApiToObject({ data: answerData }, 'answer')
      : null;

    yield put(nextQuestionSuccess(question, answer));
  } catch (error) {
    yield put(nextQuestionFailure(error));
  }
}

function* redirectToPreview({
  payload: { interventionId, sessionId, questionId, languageCode },
}) {
  yield call(logInGuest, { payload: { sessionId } });
  yield call(
    window.open,
    parametrizeRoutePath(
      RoutePath.PREVIEW_SESSION_FROM_INDEX,
      {
        interventionId,
        sessionId,
        index: questionId,
      },
      { [INTERVENTION_LANGUAGE_QUERY_KEY]: languageCode },
    ),
  );
}

function* fetchUserSession({ payload: { sessionId } }) {
  const {
    query: { cid: healthClinicId },
  } = yield select(makeSelectLocation());
  const requestUrl = `/v1/user_sessions`;
  const searchParams = new URLSearchParams();

  searchParams.set('session_id', sessionId);
  if (healthClinicId) {
    searchParams.set('health_clinic_id', healthClinicId);
  }

  try {
    const { data } = yield axios.get(`${requestUrl}?${searchParams}`);
    const userSession = jsonApiToObject(data, 'userSession');

    yield put(fetchUserSessionSuccess(userSession));
    yield put(changeLocale(userSession.languageCode));
  } catch (error) {
    const redirectPath = getInterventionNotAvailablePagePathFromApiError(error);
    if (redirectPath) {
      yield put(replace(redirectPath));
    }

    yield put(fetchUserSessionError(error));
  }
}

function* createUserSession({ payload: { sessionId } }) {
  const {
    query: { cid: healthClinicId },
  } = yield select(makeSelectLocation());
  const requestUrl = `/v1/user_sessions`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({
        userSession: { sessionId, healthClinicId },
      }),
    );
    const userSession = jsonApiToObject(data, 'userSession');

    yield put(createUserSessionSuccess(userSession));
    yield put(changeLocale(userSession.languageCode));
    yield put(resetPhoneNumberPreview());
    yield put(startSession());
  } catch (error) {
    const redirectPath = getInterventionNotAvailablePagePathFromApiError(error);
    if (redirectPath) {
      yield put(replace(redirectPath));
    }
    yield put(createUserSessionFailure(error));
  }
}

function* fetchOrCreateUserSession({ payload: { sessionId } }) {
  const {
    query: { cid: healthClinicId },
  } = yield select(makeSelectLocation());
  const requestUrl = `/v1/fetch_or_create_user_sessions`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({
        userSession: { sessionId, healthClinicId },
      }),
    );
    const userSession = jsonApiToObject(data, 'userSession');

    yield put(fetchOrCreateUserSessionSuccess(userSession));
    yield put(resetPhoneNumberPreview());
    yield put(startSession());
  } catch (error) {
    const redirectPath = getInterventionNotAvailablePagePathFromApiError(error);
    if (redirectPath) {
      yield put(replace(redirectPath));
    }
    yield put(fetchOrCreateUserSessionError(error));
  }
}

function* resetSession({ payload: { sessionId } }) {
  yield call(LocalStorageService.clearGuestHeaders);
  yield call(logInGuest, { payload: { sessionId } });
  yield put(resetReducer());
  yield call(resetPreviewUrl, sessionId);
}

function* resetPreviewUrl() {
  const location = yield select(makeSelectLocation());
  const regex = /^.*\/preview\//;

  const url = location.pathname.match(regex)?.pop();

  if (url) yield put(push(url.slice(0, url.length - 1)));
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

function* fetchPreviousQuestion({
  payload: { userSessionId, currentQuestionId },
}) {
  const requestUrl = `/v1/user_sessions/${userSessionId}/previous_question`;
  const searchParams = new URLSearchParams();
  searchParams.set('current_question_id', currentQuestionId);

  try {
    const {
      data: {
        data: questionData,
        answer: answerData,
        hfhs_patient_detail: hfhsPatientDetail,
      },
    } = yield axios.get(`${requestUrl}?${searchParams}`);

    if (!questionData) {
      throw Error(formatMessage(messages.previousScreenNotFound));
    }

    if (hfhsPatientDetail) {
      yield put(setHfhsPatientDetail(objectToCamelCase(hfhsPatientDetail)));
    }

    const question = mapQuestionToStateObject(questionData);
    const answer = answerData
      ? jsonApiToObject({ data: answerData }, 'answer')
      : null;

    yield put(fetchPreviousQuestionSuccess(question, answer));
  } catch (error) {
    yield call(toast.error, error.response?.data?.message ?? error.toString());
    yield put(fetchPreviousQuestionError(error));
  }
}

function* verifyPatientData({ payload }) {
  const requestUrl = '/v1/henry_ford/verify';

  const question = yield select(makeSelectCurrentQuestion());
  const userSession = yield select(makeSelectUserSession());
  if (!question || !userSession) return;

  const { id: userSessionId, sessionId } = userSession;
  const { id: questionId, type, settings } = question;

  try {
    const { data } = yield axios.post(requestUrl, {
      ...objectToSnakeCase(payload),
      session_id: sessionId,
    });

    const hfhsPatientDetail = jsonApiToObject(data, 'hfhsPatientDetail');
    yield put(setHfhsPatientDetail(hfhsPatientDetail));
    yield put(verifyPatientDataSuccess());

    yield put(
      submitAnswer(
        questionId,
        settings?.required ?? false,
        type,
        sessionId,
        userSessionId,
        false,
      ),
    );
  } catch (error) {
    yield put(verifyPatientDataError(error));
  }
}

function* verifyQRCode({ payload: { decodedString } }) {
  const userSession = yield select(makeSelectUserSession());
  if (!userSession) return;

  const requestUrl = `/v1/henry_ford/verify_by_code`;

  try {
    const { data } = yield axios.post(requestUrl, {
      hfhs_patient_data: { barcode: decodedString },
    });

    console.log('verifyQRCode response data:', data);
    const hfhsPatientDetail = jsonApiToObject(
      data,
      'hfhsPatientDetailAnonymized',
    );
    console.log('Parsed hfhsPatientDetail:', hfhsPatientDetail);
    yield put(setHfhsPatientDetail(hfhsPatientDetail));
    yield put(verifyQRCodeSuccess());
  } catch (error) {
    yield put(verifyQRCodeError(error));
  }
}

// Individual exports for testing
export default function* AnswerSessionPageSaga() {
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
  yield takeLatest(RESET_SESSION, resetSession);
  yield takeLatest(FETCH_USER_SESSION_REQUEST, fetchUserSession);
  yield takeLatest(CREATE_USER_SESSION_REQUEST, createUserSession);
  yield takeLatest(
    FETCH_OR_CREATE_USER_SESSION_REQUEST,
    fetchOrCreateUserSession,
  );
  yield takeLatest(NEXT_QUESTION_REQUEST, nextQuestion);
  yield takeLatest(SAVE_QUICK_EXIT_EVENT_REQUEST, saveQuickExitEvent);
  yield takeEvery(FETCH_PREVIOUS_QUESTION_REQUEST, fetchPreviousQuestion);
  yield takeLatest(VERIFY_PATIENT_DATA_REQUEST, verifyPatientData);
  yield takeLatest(VERIFY_QR_CODE_REQUEST, verifyQRCode);
}

export function* redirectToPreviewSaga() {
  yield takeLatest(REDIRECT_TO_PREVIEW, redirectToPreview);
}
