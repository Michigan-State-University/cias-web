/*
 *
 * AnswerInterventionPage actions
 *
 */

import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_FAILURE,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  START_INTERVENTION,
  SET_QUESTION_INDEX,
} from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

export const fetchQuestions = interventionId =>
  actionBuilder(FETCH_QUESTIONS, { interventionId });

export const fetchQuestionsSuccess = questions =>
  actionBuilder(FETCH_QUESTIONS_SUCCESS, { questions });

export const fetchQuestionsFailure = error =>
  actionBuilder(FETCH_QUESTION_FAILURE, { error });

export const selectAnswer = payload => actionBuilder(SELECT_ANSWER, payload);

export const submitAnswer = (answerId, nextQuestionIndex) =>
  actionBuilder(SUBMIT_ANSWER_REQUEST, { answerId, nextQuestionIndex });

export const submitAnswerSuccess = answerId =>
  actionBuilder(SUBMIT_ANSWER_SUCCESS, { answerId });

export const submitAnswerFailure = (answerId, error) =>
  actionBuilder(SUBMIT_ANSWER_ERROR, { error, answerId });

export const setQuestionIndex = index =>
  actionBuilder(SET_QUESTION_INDEX, { index });

export const startIntervention = () => actionBuilder(START_INTERVENTION, {});
