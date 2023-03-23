/*
 *
 * AnswerSessionPage actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  RESET_REDUCER,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  START_SESSION,
  CHANGE_PREVIEW_MODE,
  RESET_SESSION,
  CHANGE_IS_ANIMATING,
  SET_FEEDBACK_SCREEN_SETTINGS,
  REDIRECT_TO_PREVIEW,
  CREATE_USER_SESSION_REQUEST,
  CREATE_USER_SESSION_SUCCESS,
  CREATE_USER_SESSION_FAILURE,
  NEXT_QUESTION_REQUEST,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAILURE,
  CLEAR_ERROR,
  CHANGE_USER_SESSION_ID,
  SET_CURRENT_BLOCK_INDEX,
  SET_PARTICIPANT_SESSION_SETTINGS,
  SET_TRANSITIONAL_USER_SESSION_ID,
  SAVE_QUICK_EXIT_EVENT_REQUEST,
  FETCH_USER_SESSION_REQUEST,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION_ERROR,
  FETCH_OR_CREATE_USER_SESSION_REQUEST,
  FETCH_OR_CREATE_USER_SESSION_SUCCESS,
  FETCH_OR_CREATE_USER_SESSION_ERROR,
  FETCH_PREVIOUS_QUESTION_REQUEST,
  FETCH_PREVIOUS_QUESTION_SUCCESS,
  FETCH_PREVIOUS_QUESTION_ERROR,
} from './constants';

export const resetReducer = () => actionBuilder(RESET_REDUCER, {});

export const selectAnswer = (answerBody, questionId) =>
  actionBuilder(SELECT_ANSWER, { answerBody, questionId });

export const submitAnswer = (
  questionId,
  required,
  type,
  sessionId,
  userSessionId,
  skipped,
) =>
  actionBuilder(SUBMIT_ANSWER_REQUEST, {
    questionId,
    required,
    type,
    sessionId,
    userSessionId,
    skipped,
  });

export const submitAnswerSuccess = (questionId) =>
  actionBuilder(SUBMIT_ANSWER_SUCCESS, { questionId });

export const submitAnswerFailure = (questionId, error) =>
  actionBuilder(SUBMIT_ANSWER_ERROR, { error, questionId });

export const startSession = () => actionBuilder(START_SESSION, {});

export const resetSession = (sessionId) =>
  actionBuilder(RESET_SESSION, { sessionId });

export const redirectToPreview = (interventionId, sessionId, questionId) =>
  actionBuilder(REDIRECT_TO_PREVIEW, {
    interventionId,
    sessionId,
    questionId,
  });

export const changePreviewMode = (previewMode) =>
  actionBuilder(CHANGE_PREVIEW_MODE, { previewMode });

export const changeIsAnimating = (isAnimating) =>
  actionBuilder(CHANGE_IS_ANIMATING, { isAnimating });

export const setFeedbackScreenSettings = (setting, value) =>
  actionBuilder(SET_FEEDBACK_SCREEN_SETTINGS, { setting, value });

export const fetchUserSessionRequest = (sessionId) =>
  actionBuilder(FETCH_USER_SESSION_REQUEST, { sessionId });
export const fetchUserSessionSuccess = (userSession) =>
  actionBuilder(FETCH_USER_SESSION_SUCCESS, { userSession });
export const fetchUserSessionError = (error) =>
  actionBuilder(FETCH_USER_SESSION_ERROR, { error });

export const createUserSessionRequest = (sessionId) =>
  actionBuilder(CREATE_USER_SESSION_REQUEST, { sessionId });
export const createUserSessionSuccess = (userSession) =>
  actionBuilder(CREATE_USER_SESSION_SUCCESS, { userSession });
export const createUserSessionFailure = (error) =>
  actionBuilder(CREATE_USER_SESSION_FAILURE, { error });

export const fetchOrCreateUserSessionRequest = (sessionId) =>
  actionBuilder(FETCH_OR_CREATE_USER_SESSION_REQUEST, { sessionId });
export const fetchOrCreateUserSessionSuccess = (userSession) =>
  actionBuilder(FETCH_OR_CREATE_USER_SESSION_SUCCESS, { userSession });
export const fetchOrCreateUserSessionError = (error) =>
  actionBuilder(FETCH_OR_CREATE_USER_SESSION_ERROR, { error });

export const nextQuestionRequest = (userSessionId, questionId) =>
  actionBuilder(NEXT_QUESTION_REQUEST, { userSessionId, questionId });
export const nextQuestionSuccess = (question, answer) =>
  actionBuilder(NEXT_QUESTION_SUCCESS, { question, answer });
export const nextQuestionFailure = (error) =>
  actionBuilder(NEXT_QUESTION_FAILURE, { error });

export const clearError = () => actionBuilder(CLEAR_ERROR, {});

export const changeUserSessionId = (userSessionId) =>
  actionBuilder(CHANGE_USER_SESSION_ID, { userSessionId });

export const setCurrentBlockIndex = (index) =>
  actionBuilder(SET_CURRENT_BLOCK_INDEX, { index });

export const setParticipantSessionSettings = (settings) =>
  actionBuilder(SET_PARTICIPANT_SESSION_SETTINGS, { settings });

export const setTransitionalUserSessionId = (userSessionId) =>
  actionBuilder(SET_TRANSITIONAL_USER_SESSION_ID, { userSessionId });

export const saveQuickExitEventRequest = (userSessionId, isPreview) =>
  actionBuilder(SAVE_QUICK_EXIT_EVENT_REQUEST, { userSessionId, isPreview });

export const fetchPreviousQuestionRequest = (
  userSessionId,
  currentQuestionId,
) =>
  actionBuilder(FETCH_PREVIOUS_QUESTION_REQUEST, {
    userSessionId,
    currentQuestionId,
  });
export const fetchPreviousQuestionSuccess = (question, answer) =>
  actionBuilder(FETCH_PREVIOUS_QUESTION_SUCCESS, { question, answer });
export const fetchPreviousQuestionError = (error) =>
  actionBuilder(FETCH_PREVIOUS_QUESTION_ERROR, { error });
