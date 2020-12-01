/*
 *
 * AnswerSessionPage reducer
 *
 */
import produce from 'immer';
import set from 'lodash/set';
import { findQuestionIndex } from 'models/Session/utils';
import { DESKTOP_MODE } from 'utils/previewMode';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION_FAILURE,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  SET_QUESTION_INDEX,
  START_SESSION,
  CHANGE_PREVIEW_MODE,
  RESET_SESSION,
  CHANGE_IS_ANIMATING,
  SET_FEEDBACK_SCREEN_SETTINGS,
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
};

/* eslint-disable default-case, no-param-reassign */
const AnswerSessionPageReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_QUESTIONS:
        draft.questionError = '';
        draft.questionLoading = true;
        draft.interventionStarted = false;
        draft.sessionId = payload.sessionId;
        break;

      case FETCH_QUESTIONS_SUCCESS:
        draft.questionError = '';
        draft.questionLoading = false;
        draft.sessionQuestions = payload.questions;
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
        let index = null;
        draft.feedbackScreenSettings = getEmptyFeedbackScreenSettings();

        if (!isNullOrUndefined(payload.question)) {
          index = findQuestionIndex(
            state.sessionQuestions,
            payload.question.id,
          );

          if (index === -1) index = draft.questionIndex + 1;

          set(draft, ['sessionQuestions', index], payload.question);
        } else if (!isNullOrUndefined(payload.index)) ({ index } = payload);
        else index = draft.questionIndex + 1;

        draft.questionIndex = index;
        break;

      case START_SESSION:
        draft.interventionStarted = true;
        break;

      case CHANGE_PREVIEW_MODE:
        draft.previewMode = payload.previewMode;
        break;
      case RESET_SESSION:
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
    }
  });

export default AnswerSessionPageReducer;
