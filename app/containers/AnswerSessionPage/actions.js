/*
 *
 * AnswerSessionPage actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
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
  RESET_ANSWERS,
  CREATE_USER_SESSION_REQUEST,
  CREATE_USER_SESSION_SUCCESS,
  CREATE_USER_SESSION_FAILURE,
  NEXT_QUESTION_REQUEST,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAILURE,
  CLEAR_ERROR,
  CHANGE_USER_SESSION_ID,
  SET_CURRENT_BLOCK_INDEX,
  TOGGLE_TEXT_TRANSCRIPT,
  SET_TRANSITIONAL_USER_SESSION_ID,
} from './constants';

export const selectAnswer = (payload) => actionBuilder(SELECT_ANSWER, payload);

export const submitAnswer = (
  answerId,
  required,
  type,
  sessionId,
  userSessionId,
) =>
  actionBuilder(SUBMIT_ANSWER_REQUEST, {
    answerId,
    required,
    type,
    sessionId,
    userSessionId,
  });

export const submitAnswerSuccess = (answerId) =>
  actionBuilder(SUBMIT_ANSWER_SUCCESS, { answerId });

export const submitAnswerFailure = (answerId, error) =>
  actionBuilder(SUBMIT_ANSWER_ERROR, { error, answerId });

export const startSession = () => actionBuilder(START_SESSION, {});

export const resetSession = (sessionId) =>
  actionBuilder(RESET_SESSION, { sessionId });

export const resetAnswers = () => actionBuilder(RESET_ANSWERS, {});

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

export const createUserSessionRequest = (sessionId) =>
  actionBuilder(CREATE_USER_SESSION_REQUEST, { sessionId });

export const createUserSessionSuccess = (userSession) =>
  actionBuilder(CREATE_USER_SESSION_SUCCESS, { userSession });

export const createUserSessionFailure = (error) =>
  actionBuilder(CREATE_USER_SESSION_FAILURE, { error });

export const nextQuestionRequest = (userSessionId, questionId) =>
  actionBuilder(NEXT_QUESTION_REQUEST, { userSessionId, questionId });

export const nextQuestionSuccess = (question) =>
  actionBuilder(NEXT_QUESTION_SUCCESS, { question });

export const nextQuestionFailure = (error) =>
  actionBuilder(NEXT_QUESTION_FAILURE, { error });

export const clearError = () => actionBuilder(CLEAR_ERROR, {});

export const changeUserSessionId = (userSessionId) =>
  actionBuilder(CHANGE_USER_SESSION_ID, { userSessionId });

export const setCurrentBlockIndex = (index) =>
  actionBuilder(SET_CURRENT_BLOCK_INDEX, { index });

export const toggleTextTranscriptAction = () =>
  actionBuilder(TOGGLE_TEXT_TRANSCRIPT, {});

export const setTransitionalUserSessionId = (userSessionId) =>
  actionBuilder(SET_TRANSITIONAL_USER_SESSION_ID, { userSessionId });
