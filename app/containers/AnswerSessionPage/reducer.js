/*
 *
 * AnswerSessionPage reducer
 *
 */
import produce from 'immer';
import { I_PHONE_8_PLUS_MODE } from 'utils/previewMode';

import {
  RESET_REDUCER,
  SUBMIT_ANSWER_ERROR,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SELECT_ANSWER,
  START_SESSION,
  CHANGE_PREVIEW_MODE,
  CHANGE_IS_ANIMATING,
  SET_FEEDBACK_SCREEN_SETTINGS,
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
  FETCH_USER_SESSION_REQUEST,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION_ERROR,
  FETCH_OR_CREATE_USER_SESSION_REQUEST,
  FETCH_OR_CREATE_USER_SESSION_SUCCESS,
  FETCH_OR_CREATE_USER_SESSION_ERROR,
  FETCH_PREVIOUS_QUESTION_REQUEST,
  FETCH_PREVIOUS_QUESTION_SUCCESS,
  FETCH_PREVIOUS_QUESTION_ERROR,
  VERIFY_PATIENT_DATA_REQUEST,
  VERIFY_PATIENT_DATA_SUCCESS,
  VERIFY_PATIENT_DATA_ERROR,
  SET_HFHS_PATIENT_DETAIL,
  SELECT_VIDEO_STATS,
  VERIFY_PID_REQUEST,
  VERIFY_PID_SUCCESS,
  VERIFY_PID_ERROR,
} from './constants';

const getEmptyFeedbackScreenSettings = () => ({
  showSpectrum: false,
  sliderRef: null,
});

export const initialState = {
  questionLoading: false,
  questionError: '',
  sessionQuestions: [],
  answersLoading: false,
  answersError: '',
  answers: {},
  videoStats: {},
  interventionStarted: false,
  previewMode: I_PHONE_8_PLUS_MODE,
  sessionId: null,
  isAnimationOngoing: true,
  feedbackScreenSettings: getEmptyFeedbackScreenSettings(),
  phoneticText: null,
  phoneticUrl: null,
  phoneticLoading: false,
  userSession: null,
  userSessionLoading: false,
  fetchUserSessionError: null,
  nextQuestionLoading: false,
  nextQuestionError: null,
  currentQuestion: null,
  currentBlockIndex: -1,
  showTextTranscript: false,
  transitionalUserSessionId: null,
  previousUserSessionId: null,
  showTextReadingControls: false,
  fetchPreviousQuestionLoading: false,
  fetchPreviousQuestionError: null,
  verifyPatientDataLoading: false,
  verifyPatientDataError: null,
  hfhsPatientDetail: null,
  verifyPidLoading: false,
  verifyPidError: null,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
const AnswerSessionPageReducer = (state = initialState, { payload, type }) =>
  produce(state, (draft) => {
    switch (type) {
      case RESET_REDUCER: {
        Object.assign(draft, initialState);
        break;
      }

      case SELECT_ANSWER: {
        const { questionId, answerBody } = payload;
        draft.answers[questionId] = { answerBody };
        break;
      }

      case SELECT_VIDEO_STATS: {
        const { questionId, videoStats } = payload;
        draft.videoStats[questionId] = videoStats;
        break;
      }

      case SUBMIT_ANSWER_REQUEST: {
        draft.answersError = '';
        const { skipped, questionId } = payload;

        draft.answers[questionId] = {
          ...state.answers[questionId],
          skipped,
          loading: true,
        };
        break;
      }

      case SUBMIT_ANSWER_SUCCESS: {
        const { questionId } = payload;

        draft.answersError = '';
        draft.answers[questionId].loading = false;
        break;
      }
      case SUBMIT_ANSWER_ERROR: {
        const { error, questionId } = payload;

        draft.answersError = error;
        draft.answers[questionId].loading = false;
        draft.answers[questionId].answerBody = state.answers[questionId]
          .answerBody
          ? state.answers[questionId].answerBody
          : [];
        break;
      }

      case START_SESSION: {
        draft.interventionStarted = true;
        break;
      }

      case CHANGE_PREVIEW_MODE: {
        draft.previewMode = payload.previewMode;
        break;
      }

      case CHANGE_IS_ANIMATING: {
        draft.isAnimationOngoing = payload.isAnimating;
        break;
      }

      case SET_FEEDBACK_SCREEN_SETTINGS: {
        draft.feedbackScreenSettings[payload.setting] = payload.value;
        break;
      }

      case FETCH_USER_SESSION_REQUEST: {
        draft.userSessionLoading = true;
        draft.fetchUserSessionError = null;
        break;
      }

      case FETCH_USER_SESSION_SUCCESS: {
        draft.userSessionLoading = false;
        draft.userSession = payload.userSession;
        break;
      }

      case FETCH_USER_SESSION_ERROR: {
        draft.userSessionLoading = false;
        draft.fetchUserSessionError = payload.error;
        break;
      }

      case CREATE_USER_SESSION_REQUEST:
      case FETCH_OR_CREATE_USER_SESSION_REQUEST: {
        draft.userSessionLoading = true;
        draft.questionError = null;
        break;
      }

      case CREATE_USER_SESSION_SUCCESS:
      case FETCH_OR_CREATE_USER_SESSION_SUCCESS: {
        draft.userSessionLoading = false;
        draft.userSession = payload.userSession;
        draft.questionError = null;
        break;
      }

      case CREATE_USER_SESSION_FAILURE:
      case FETCH_OR_CREATE_USER_SESSION_ERROR: {
        draft.userSessionLoading = false;
        draft.questionError = payload;
        break;
      }

      case NEXT_QUESTION_REQUEST: {
        draft.nextQuestionLoading = true;
        break;
      }

      case NEXT_QUESTION_SUCCESS: {
        const { question, answer } = payload;

        draft.nextQuestionError = null;
        draft.nextQuestionLoading = false;
        draft.currentQuestion = question;

        if (answer) {
          const { decryptedBody, questionId } = answer;
          draft.answers[questionId] = {
            answerBody: decryptedBody.data,
          };
        }
        break;
      }

      case NEXT_QUESTION_FAILURE: {
        draft.nextQuestionError = payload;
        draft.nextQuestionLoading = false;
        break;
      }

      case CLEAR_ERROR: {
        draft.nextQuestionError = null;
        draft.questionError = null;
        break;
      }

      case CHANGE_USER_SESSION_ID: {
        draft.previousUserSessionId = draft.userSession.id;
        draft.userSession.id = payload.userSessionId;
        break;
      }

      case SET_CURRENT_BLOCK_INDEX: {
        draft.currentBlockIndex = payload.index;
        break;
      }

      case SET_PARTICIPANT_SESSION_SETTINGS: {
        const { showTextTranscript, showTextReadingControls } =
          payload.settings;
        draft.showTextTranscript = showTextTranscript;
        draft.showTextReadingControls = showTextReadingControls;
        break;
      }

      case SET_TRANSITIONAL_USER_SESSION_ID: {
        draft.transitionalUserSessionId = payload.userSessionId;
        break;
      }

      case FETCH_PREVIOUS_QUESTION_REQUEST: {
        draft.fetchPreviousQuestionLoading = true;
        break;
      }

      case FETCH_PREVIOUS_QUESTION_SUCCESS: {
        const { question, answer } = payload;

        draft.fetchPreviousQuestionError = null;
        draft.fetchPreviousQuestionLoading = false;
        draft.currentQuestion = question;

        if (answer) {
          const { decryptedBody, questionId } = answer;
          draft.answers[questionId] = {
            answerBody: decryptedBody.data,
          };
        }
        break;
      }

      case FETCH_PREVIOUS_QUESTION_ERROR: {
        draft.fetchPreviousQuestionError = payload.error;
        draft.fetchPreviousQuestionLoading = false;
        break;
      }

      case VERIFY_PATIENT_DATA_REQUEST: {
        draft.verifyPatientDataLoading = true;
        break;
      }
      case VERIFY_PATIENT_DATA_SUCCESS: {
        draft.verifyPatientDataLoading = false;
        draft.verifyPatientDataError = null;
        break;
      }
      case VERIFY_PATIENT_DATA_ERROR: {
        draft.verifyPatientDataLoading = false;
        draft.verifyPatientDataError = payload.error;
        break;
      }

      case SET_HFHS_PATIENT_DETAIL: {
        draft.hfhsPatientDetail = payload.hfhsPatientDetail;
        break;
      }

      case VERIFY_PID_REQUEST: {
        draft.verifyPidLoading = true;
        draft.verifyPidError = null;
        break;
      }
      case VERIFY_PID_SUCCESS: {
        draft.verifyPidLoading = false;
        draft.verifyPidError = null;
        break;
      }
      case VERIFY_PID_ERROR: {
        draft.verifyPidLoading = false;
        draft.verifyPidError = payload.error;
        break;
      }
    }
  });

export default AnswerSessionPageReducer;
