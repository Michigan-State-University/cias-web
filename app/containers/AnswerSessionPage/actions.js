/*
 *
 * AnswerSessionPage actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_FAILURE,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  START_SESSION,
  SET_QUESTION_INDEX,
  CHANGE_PREVIEW_MODE,
  RESET_SESSION,
  CHANGE_IS_ANIMATING,
  SET_FEEDBACK_SCREEN_SETTINGS,
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_SUCCESS,
} from './constants';

export const fetchQuestions = sessionId =>
  actionBuilder(FETCH_QUESTIONS, { sessionId });

export const fetchQuestionsSuccess = questions =>
  actionBuilder(FETCH_QUESTIONS_SUCCESS, { questions });

export const fetchQuestionsFailure = error =>
  actionBuilder(FETCH_QUESTION_FAILURE, { error });

export const selectAnswer = payload => actionBuilder(SELECT_ANSWER, payload);

export const submitAnswer = (
  answerId,
  nextQuestionIndex,
  required,
  type,
  sessionId,
) =>
  actionBuilder(SUBMIT_ANSWER_REQUEST, {
    answerId,
    nextQuestionIndex,
    required,
    type,
    sessionId,
  });

export const submitAnswerSuccess = answerId =>
  actionBuilder(SUBMIT_ANSWER_SUCCESS, { answerId });

export const submitAnswerFailure = (answerId, error) =>
  actionBuilder(SUBMIT_ANSWER_ERROR, { error, answerId });

export const setQuestionIndex = ({ index, question }) =>
  actionBuilder(SET_QUESTION_INDEX, { index, question });

export const startSession = () => actionBuilder(START_SESSION, {});

export const resetSession = () => actionBuilder(RESET_SESSION, {});

export const changePreviewMode = previewMode =>
  actionBuilder(CHANGE_PREVIEW_MODE, { previewMode });

export const changeIsAnimating = isAnimating =>
  actionBuilder(CHANGE_IS_ANIMATING, { isAnimating });

export const setFeedbackScreenSettings = (setting, value) =>
  actionBuilder(SET_FEEDBACK_SCREEN_SETTINGS, { setting, value });

export const phoneticPreviewRequest = text =>
  actionBuilder(PHONETIC_PREVIEW_REQUEST, { text });

export const phoneticPreviewSuccess = url =>
  actionBuilder(PHONETIC_PREVIEW_SUCCESS, { url });
