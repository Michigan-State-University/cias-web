/*
 *
 * AnswerInterventionPage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_FAILURE,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  SET_QUESTION_INDEX,
  START_INTERVENTION,
} from './constants';

export const initialState = {
  questionLoading: false,
  questionError: '',
  interventionQuestions: [],
  questionIndex: 0,
  answersLoading: false,
  answersError: '',
  answers: {},
  interventionStarted: false,
};

/* eslint-disable default-case, no-param-reassign */
const answerInterventionPageReducer = (
  state = initialState,
  { payload, type },
) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_QUESTIONS:
        draft.questionError = '';
        draft.questionLoading = true;
        draft.interventionStarted = false;
        break;

      case FETCH_QUESTIONS_SUCCESS:
        draft.questionError = '';
        draft.questionLoading = false;
        draft.interventionQuestions = payload.questions;
        break;

      case FETCH_QUESTION_FAILURE:
        draft.questionError = payload.error;
        draft.questionLoading = false;
        break;

      case SELECT_ANSWER:
        draft.answers[payload.id] = payload;
        break;

      case SUBMIT_ANSWER_REQUEST:
        draft.answersError = '';
        draft.answers[payload.answerId] = {
          ...state.answers[payload.answerId],
          loading: true,
        };
        break;

      case SUBMIT_ANSWER_SUCCESS:
        draft.answersError = '';
        draft.answers[payload.answerId].loading = false;
        draft.answers[payload.answerId].questionId = state.questionIndex;
        break;

      case SUBMIT_ANSWER_ERROR:
        draft.answersError = payload.error;
        draft.answers[payload.answerId].loading = false;
        draft.answers[payload.answerId].answerBody = state.answers[
          payload.answerId
        ].answerBody
          ? state.answers[payload.answerId].answerBody
          : [];
        break;

      case SET_QUESTION_INDEX:
        draft.questionIndex = payload.index;
        break;

      case START_INTERVENTION:
        draft.interventionStarted = true;
        break;
    }
  });

export default answerInterventionPageReducer;
