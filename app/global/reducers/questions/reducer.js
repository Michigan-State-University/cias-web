import produce from 'immer';
import set from 'lodash/set';

import questionDataReducer from 'containers/Interventions/components/QuestionData/reducer';
import questionSettingsReducer from 'containers/Interventions/components/QuestionSettings/Settings/reducer';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';

import {
  SELECT_QUESTION,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  ADD_QUESTION_IMAGE_REQUEST,
  ADD_QUESTION_IMAGE_SUCCESS,
  ADD_QUESTION_IMAGE_ERROR,
  DELETE_QUESTION_IMAGE_REQUEST,
  DELETE_QUESTION_IMAGE_SUCCESS,
  DELETE_QUESTION_IMAGE_ERROR,
  COPY_QUESTION_REQUEST,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  CHANGE_QUESTION_TYPE_REQUEST,
  CHANGE_QUESTION_TYPE_SUCCESS,
  CHANGE_QUESTION_TYPE_ERROR,
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_SUCCESS,
  REORDER_QUESTION_LIST_ERROR,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
} from './constants';

import {
  mapQuestionDataForType,
  assignFromQuestionTTS,
  editQuestionSuccessCommon,
  editQuestionErrorCommon,
} from './utils';
import { GROUP_QUESTIONS_SUCCESS } from '../questionGroups/constants';

export const initialState = {
  selectedQuestion: '',
  questions: [],
  cache: {
    questions: [],
  },
  loaders: {
    getQuestionsLoading: true,
    updateQuestionLoading: false,
    createQuestionLoading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const questionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_QUESTION:
        draft.selectedQuestion = action.payload.index;
        break;

      case CREATE_QUESTION_REQUEST:
        draft.loaders.createQuestionLoading = true;
        break;

      case CREATE_QUESTION_SUCCESS:
        draft.questions = [
          ...state.questions,
          mapQuestionDataForType(action.payload.question),
        ];
        draft.cache.questions = draft.questions;
        draft.selectedQuestion = action.payload.question.id;
        draft.loaders.createQuestionLoading = false;
        break;
      case CREATE_QUESTION_ERROR:
        draft.loaders.createQuestionLoading = false;
        break;

      case GET_QUESTIONS_REQUEST:
        draft.loaders.getQuestionsLoading = true;
        break;
      case GET_QUESTIONS_SUCCESS:
        draft.loaders.getQuestionsLoading = false;
        draft.selectedQuestion =
          action.payload.questions.length !== 0
            ? action.payload.questions[0].id
            : '';
        draft.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );
        draft.cache.questions = draft.questions;
        break;
      case GET_QUESTIONS_ERROR:
        draft.loaders.getQuestionsLoading = false;
        break;

      case EDIT_QUESTION_REQUEST: {
        draft.loaders.updateQuestionLoading = true;
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        set(
          draft.questions[questionIndex],
          action.payload.path,
          action.payload.value,
        );
        assignFromQuestionTTS(draft, state);
        break;
      }
      case EDIT_QUESTION_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case EDIT_QUESTION_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_REQUEST: {
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex].image_url = action.payload.imageUrl;
        break;
      }
      case ADD_QUESTION_IMAGE_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case DELETE_QUESTION_IMAGE_REQUEST: {
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex].image_url = null;
        break;
      }
      case DELETE_QUESTION_IMAGE_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;
      case DELETE_QUESTION_IMAGE_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case COPY_QUESTION_REQUEST:
        break;
      case COPY_QUESTION_SUCCESS:
        draft.questions = [
          ...state.questions,
          mapQuestionDataForType(action.payload.question),
        ];
        draft.cache.questions = draft.questions;
        draft.selectedQuestion = action.payload.question.id;
        break;
      case COPY_QUESTION_ERROR:
        break;

      case CHANGE_QUESTION_TYPE_REQUEST: {
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex] = {
          ...draft.questions[questionIndex],
          ...instantiateEmptyQuestion(
            draft.questions[questionIndex].title,
            action.payload.newType,
          ),
          formula: { payload: '', patterns: [] },
        };
        break;
      }
      case CHANGE_QUESTION_TYPE_SUCCESS:
        draft.cache.questions = draft.questions;
        break;
      case CHANGE_QUESTION_TYPE_ERROR:
        draft.questions = draft.cache.questions;
        break;

      case REORDER_QUESTION_LIST_REQUEST:
        draft.questions = action.payload.reorderedList;
        break;
      case REORDER_QUESTION_LIST_SUCCESS:
        draft.cache.questions = draft.questions;
        break;
      case REORDER_QUESTION_LIST_ERROR:
        draft.questions = draft.cache.questions;
        break;

      case DELETE_QUESTION_REQUEST:
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.questionId,
        );
        break;
      case DELETE_QUESTION_SUCCESS:
        draft.cache.questions = draft.questions;
        break;
      case DELETE_QUESTION_ERROR:
        draft.questions = draft.cache.questions;
        break;

      case UPDATE_QUESTION_DATA: {
        const selectedQuestionIndex = draft.questions.findIndex(
          ({ id }) => id === draft.selectedQuestion,
        );
        draft.questions[selectedQuestionIndex] = {
          ...draft.questions[selectedQuestionIndex],
          ...questionDataReducer(
            draft.questions[selectedQuestionIndex],
            action.payload,
          ),
        };
        assignFromQuestionTTS(draft, state);
        break;
      }

      case UPDATE_QUESTION_SETTINGS: {
        const selectedQuestionIndex = draft.questions.findIndex(
          ({ id }) => id === draft.selectedQuestion,
        );
        const settings = questionSettingsReducer(
          draft.questions,
          action.payload,
          draft.selectedQuestion,
        );
        draft.loaders.updateQuestionLoading = true;
        draft.questions[selectedQuestionIndex] = {
          ...draft.questions[selectedQuestionIndex],
          ...settings,
        };
        break;
      }
      case GROUP_QUESTIONS_SUCCESS: {
        draft.questions = draft.questions.map(question => ({
          ...question,
          question_group_id: action.payload.questionIds.includes(question.id)
            ? action.payload.group.id
            : question.question_group_id,
        }));
      }
    }
  });
