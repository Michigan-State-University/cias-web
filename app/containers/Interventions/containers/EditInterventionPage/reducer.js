import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';

import {
  bodyAnimationType,
  speechType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';

import {
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  ADD_QUESTION_IMAGE,
  UPDATE_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  GET_QUESTIONS_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  TOGGLE_QUESTION_SETTINGS,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_PREVIEW_ANIMATION,
  DELETE_QUESTION_REQUEST,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  CHANGE_QUESTION_TYPE,
  REORDER_QUESTION_LIST,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_ERROR,
  UPDATE_CACHE,
  RESTORE_CACHE,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  MAKE_PEEDY_DRAGGABLE,
  SET_ANIMATION_STOP_POSITION,
  UPDATE_PREVIEW_DATA,
} from './constants';
import questionDataReducer from '../../components/QuestionData/reducer';
import questionSettingsReducer from '../../components/QuestionSettings/Settings/reducer';
import {
  instantiateEmptyQuestion,
  mapQuestionDataForType,
  getAnimationPosition,
} from './utils';

export const initialState = {
  questions: [],
  questionSettingsVisibility: false,
  selectedQuestion: 0,
  animationPosition: {
    x: 0,
    y: 0,
  },
  draggable: false,
  previewData: {
    animation: 'standStill',
    type: 'BodyAnimation',
  },
  cache: {
    questions: [],
  },
  loaders: {
    interventionListLoading: false,
    questionListLoading: true,
    updateQuestion: false,
  },
};

const getPreviewData = data => {
  switch (data.type) {
    case speechType:
      return data;

    case headAnimationType:
    case bodyAnimationType:
    default:
      return { type: 'BodyAnimation', animation: data.animation };
  }
};

/* eslint-disable default-case, no-param-reassign */
const editInterventionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_QUESTION_SETTINGS:
        if (action.payload.index < 0) {
          draft.questionSettingsVisibility = false;
          break;
        }
        if (
          action.payload.index === state.selectedQuestion &&
          state.questionSettingsVisibility
        ) {
          draft.questionSettingsVisibility = false;
          break;
        }
        draft.questionSettingsVisibility = true;
        break;

      case UPDATE_PREVIEW_ANIMATION:
      case UPDATE_PREVIEW_DATA:
        draft.previewData = getPreviewData(action.payload);
        break;
      case SELECT_QUESTION:
        draft.draggable = false;
        draft.animationPosition = getAnimationPosition(
          draft,
          state,
          action.payload,
        );
        draft.selectedQuestion = action.payload;
        break;

      // backend connected states
      case ADD_QUESTION_IMAGE:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          image_url: action.payload.imageUrl,
        };
        break;
      case UPDATE_QUESTION_IMAGE:
        draft.questions[state.selectedQuestion].image_url = action.payload.url;
        break;
      case DELETE_QUESTION_IMAGE:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          image_url: null,
        };
        break;

      case DELETE_QUESTION_REQUEST:
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.questionId,
        );
        break;

      case COPY_QUESTION_SUCCESS:
        draft.cache.questions.push(
          mapQuestionDataForType(action.payload.question),
        );

        draft.questions = cloneDeep(draft.cache.questions);
        draft.selectedQuestion = draft.questions.length - 1;
        break;

      case COPY_QUESTION_ERROR:
        break;

      case CREATE_QUESTION_SUCCESS:
        draft.cache.questions.push(
          mapQuestionDataForType(action.payload.question),
        );

        draft.questions = cloneDeep(draft.cache.questions);
        draft.selectedQuestion = draft.questions.length - 1;
        break;

      case GET_QUESTIONS_REQUEST:
        draft.loaders.questionListLoading = true;
        break;

      case GET_QUESTIONS_SUCCESS:
        draft.loaders.questionListLoading = false;
        draft.cache.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );
        if (
          !isEmpty(action.payload.questions) &&
          action.payload.questions[0].narrator.blocks[0]
        ) {
          draft.animationPosition =
            action.payload.questions[0].narrator.blocks[0].position.posTo;
        }

        draft.questions = cloneDeep(draft.cache.questions);
        break;

      case GET_QUESTIONS_ERROR:
        draft.loaders.questionListLoading = false;
        break;

      case CHANGE_QUESTION_TYPE:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...instantiateEmptyQuestion(
            draft.questions[state.selectedQuestion].title,
            action.payload.newType,
          ),
          formula: { payload: '', patterns: [] },
        };
        break;
      case REORDER_QUESTION_LIST:
        draft.questions = action.payload.reorderedList;
        break;

      case EDIT_QUESTION_REQUEST:
        set(
          draft.questions[state.selectedQuestion],
          action.payload.path,
          action.payload.value,
        );
        break;

      case UPDATE_QUESTION_DATA:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...questionDataReducer(
            state.questions[state.selectedQuestion],
            action.payload,
          ),
        };
        break;

      case UPDATE_QUESTION_SETTINGS:
        draft.loaders.updateQuestion = true;

        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...questionSettingsReducer(
            state.questions,
            action.payload,
            state.selectedQuestion,
          ),
        };
        break;

      case EDIT_QUESTION_SUCCESS:
        draft.loaders.updateQuestion = false;

        draft.cache.questions[state.selectedQuestion] = mapQuestionDataForType(
          action.payload.question,
        );
        break;

      case EDIT_QUESTION_ERROR:
        draft.loaders.updateQuestion = false;

        draft.questions[state.selectedQuestion] = cloneDeep(
          draft.cache.questions[state.selectedQuestion],
        );
        break;

      case UPDATE_CACHE:
        draft.cache.questions = draft.questions;
        break;
      case RESTORE_CACHE:
        draft.questions = draft.cache.questions;
        break;
      case MAKE_PEEDY_DRAGGABLE:
        draft.draggable = action.payload.draggable;
        break;
      case SET_ANIMATION_STOP_POSITION:
        draft.animationPosition = action.payload;
    }
  });

export default editInterventionPageReducer;
