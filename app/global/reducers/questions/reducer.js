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

export const initialState = {
  selectedQuestion: 0,
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
        draft.selectedQuestion = draft.questions.length - 1;
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
        draft.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );
        draft.cache.questions = draft.questions;
        break;
      case GET_QUESTIONS_ERROR:
        draft.loaders.getQuestionsLoading = false;
        break;

      case EDIT_QUESTION_REQUEST:
        draft.loaders.updateQuestionLoading = true;
        set(
          draft.questions[state.selectedQuestion],
          action.payload.path,
          action.payload.value,
        );
        assignFromQuestionTTS(draft, state);
        break;
      case EDIT_QUESTION_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case EDIT_QUESTION_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_REQUEST:
        draft.questions[state.selectedQuestion].image_url =
          action.payload.imageUrl;
        break;
      case ADD_QUESTION_IMAGE_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case DELETE_QUESTION_IMAGE_REQUEST:
        draft.questions[state.selectedQuestion].image_url = null;
        break;
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
        draft.selectedQuestion = draft.questions.length - 1;
        break;
      case COPY_QUESTION_ERROR:
        break;

      case CHANGE_QUESTION_TYPE_REQUEST:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...instantiateEmptyQuestion(
            draft.questions[state.selectedQuestion].title,
            action.payload.newType,
          ),
          formula: { payload: '', patterns: [] },
        };
        break;
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

      case UPDATE_QUESTION_DATA:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...questionDataReducer(
            state.questions[state.selectedQuestion],
            action.payload,
          ),
        };
        assignFromQuestionTTS(draft, state);
        break;

      case UPDATE_QUESTION_SETTINGS:
        const settings = questionSettingsReducer(
          state.questions,
          action.payload,
          state.selectedQuestion,
        );
        draft.loaders.updateQuestionLoading = true;
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...settings,
        };
        break;
    }
  });
