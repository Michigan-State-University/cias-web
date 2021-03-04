/*
 *
 * AnswerSessionPage reducer
 *
 */
import produce from 'immer';
import { DESKTOP_MODE } from 'utils/previewMode';

import {
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  START_SESSION,
  CHANGE_PREVIEW_MODE,
  CHANGE_IS_ANIMATING,
  SET_FEEDBACK_SCREEN_SETTINGS,
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_SUCCESS,
  RESET_ANSWERS,
  CREATE_USER_SESSION_REQUEST,
  CREATE_USER_SESSION_SUCCESS,
  CREATE_USER_SESSION_FAILURE,
  NEXT_QUESTION_REQUEST,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAILURE,
  CLEAR_ERROR,
} from './constants';

const getEmptyFeedbackScreenSettings = () => ({
  showSpectrum: false,
  sliderRef: null,
});

export const initialState = {
  questionLoading: true,
  questionError: '',
  sessionQuestions: [],
  questionIndex: 0,
  answersLoading: false,
  answersError: '',
  answers: {},
  interventionStarted: false,
  previewMode: DESKTOP_MODE,
  sessionId: null,
  isAnimationOngoing: true,
  feedbackScreenSettings: getEmptyFeedbackScreenSettings(),
  phoneticText: null,
  phoneticUrl: null,
  phoneticLoading: false,
  userSession: null,
  userSessionLoading: true,
  nextQuestionLoading: true,
  nextQuestionError: null,
  currentQuestion: null,
};

/* eslint-disable default-case, no-param-reassign */
const AnswerSessionPageReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
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

      case START_SESSION:
        draft.interventionStarted = true;
        break;

      case CHANGE_PREVIEW_MODE:
        draft.previewMode = payload.previewMode;
        break;
      case RESET_ANSWERS:
        draft.answers = initialState.answers;
        draft.questionIndex = 0;
        draft.interventionStarted = false;
        break;
      case CHANGE_IS_ANIMATING:
        draft.isAnimationOngoing = payload.isAnimating;
        break;
      case SET_FEEDBACK_SCREEN_SETTINGS:
        draft.feedbackScreenSettings[payload.setting] = payload.value;
        break;
      case PHONETIC_PREVIEW_REQUEST:
        draft.phoneticText = payload;
        draft.phoneticLoading = true;
        draft.phoneticUrl = null;
        break;
      case PHONETIC_PREVIEW_SUCCESS:
        draft.phoneticUrl = payload.url;
        draft.phoneticLoading = false;
        break;

      case CREATE_USER_SESSION_REQUEST:
        draft.userSessionLoading = true;
        draft.questionError = null;
        break;

      case CREATE_USER_SESSION_SUCCESS:
        draft.userSessionLoading = false;
        draft.userSession = payload.userSession;
        draft.questionError = null;
        break;

      case CREATE_USER_SESSION_FAILURE:
        draft.userSessionLoading = false;
        draft.questionError = payload;
        break;

      case NEXT_QUESTION_REQUEST:
        draft.nextQuestionLoading = true;
        break;

      case NEXT_QUESTION_SUCCESS:
        draft.nextQuestionError = null;
        draft.nextQuestionLoading = false;
        draft.currentQuestion = payload.question;
        break;

      case NEXT_QUESTION_FAILURE:
        draft.nextQuestionError = payload;
        draft.nextQuestionLoading = false;
        break;

      case CLEAR_ERROR:
        draft.nextQuestionError = null;
        draft.questionError = null;
        break;
    }
  });

export default AnswerSessionPageReducer;
