import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import Intervention from 'models/Intervention/Intervention';

import {
  textboxQuestion,
  numberQuestion,
  gridQuestion,
} from 'models/Intervention/QuestionTypes';

import {
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  ADD_QUESTION_IMAGE,
  UPDATE_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  UPDATE_QUESTION_VIDEO,
  GET_INTERVENTION_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_ERROR,
  TOGGLE_QUESTION_SETTINGS,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_PREVIEW_ANIMATION,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  COPY_QUESTION,
  DELETE_QUESTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  CHANGE_QUESTION_TYPE,
  REORDER_QUESTION_LIST,
  GET_INTERVENTION_LIST_REQUEST,
  GET_INTERVENTION_LIST_SUCCESS,
  GET_INTERVENTION_LIST_ERROR,
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_ERROR,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_ERROR,
} from './constants';

import questionDataReducer from '../../components/QuestionData/reducer';
import questionSettingsReducer from '../../components/QuestionSettings/Settings/reducer';
import { instantiateEmptyQuestion } from './utils';

export const initialState = {
  intervention: new Intervention('', ''),
  interventionList: [],
  questions: [],
  questionSettingsVisibility: false,
  selectedQuestion: 0,
  previewAnimation: 'stand-still',
  cache: {
    intervention: new Intervention('', ''),
    questions: [],
  },
  loaders: {
    interventionListLoading: false,
    interventionLoading: true,
    questionListLoading: false,
  },
};

const mapQuestionDataForType = question => {
  switch (question.type) {
    case textboxQuestion.id:
    case numberQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [{ variable: { name: '', value: '1' }, payload: '' }],
        },
      };

    case gridQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [
                {
                  variable: { name: '', value: '1' },
                  payload: {
                    rows: [],
                    columns: [],
                  },
                },
              ],
        },
      };

    default:
      return question;
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
        draft.previewAnimation = action.payload.animation;
        break;
      case SELECT_QUESTION:
        draft.selectedQuestion = action.payload;
        break;

      case UPDATE_QUESTION_TITLE:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          title: action.payload,
        };
        break;
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

      case UPDATE_QUESTION_VIDEO:
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          video_url: action.payload,
        };
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
        draft.questions[state.selectedQuestion] = {
          ...draft.questions[state.selectedQuestion],
          ...questionSettingsReducer(
            state.questions[state.selectedQuestion],
            action.payload,
          ),
        };
        break;

      case DELETE_QUESTION_SUCCESS:
        draft.cache.questions = draft.cache.questions.filter(
          question => question.id !== action.payload.questionId,
        );
        break;

      case DELETE_QUESTION_ERROR:
        draft.questions = cloneDeep(draft.cache.questions);
        break;

      case DELETE_QUESTION:
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.questionId,
        );
        break;

      case COPY_QUESTION:
        draft.questions.push(action.payload.copied);
        break;

      case UPDATE_QUESTION_SUCCESS:
        draft.cache.questions[state.selectedQuestion] = mapQuestionDataForType(
          action.payload.question,
        );
        break;

      case UPDATE_QUESTION_ERROR:
        draft.questions[state.selectedQuestion] = cloneDeep(
          draft.cache.questions[state.selectedQuestion],
        );
        break;

      case CREATE_QUESTION_SUCCESS:
        draft.cache.questions.push(
          mapQuestionDataForType(action.payload.question),
        );

        draft.questions = cloneDeep(draft.cache.questions);
        break;

      case GET_QUESTIONS_REQUEST:
        draft.loaders.questionListLoading = true;
        break;

      case GET_QUESTIONS_SUCCESS:
        draft.loaders.questionListLoading = false;
        draft.cache.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );

        draft.questions = cloneDeep(draft.cache.questions);
        break;

      case GET_QUESTIONS_ERROR:
        draft.loaders.questionListLoading = false;
        break;

      case GET_INTERVENTION_REQUEST:
        draft.loaders.interventionLoading = true;
        break;

      case GET_INTERVENTION_SUCCESS:
        draft.loaders.interventionLoading = false;
        draft.cache.intervention = action.payload.intervention;
        draft.intervention = cloneDeep(draft.cache.intervention);
        break;

      case GET_INTERVENTION_ERROR:
        draft.loaders.interventionLoading = false;
        break;

      case EDIT_INTERVENTION_REQUEST:
        set(draft.intervention, action.payload.path, action.payload.value);
        break;

      case EDIT_INTERVENTION_SUCCESS:
        draft.intervention = action.payload.intervention;
        draft.cache.intervention = action.payload.intervention;
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
      case GET_INTERVENTION_LIST_REQUEST:
        if (!draft.interventionList || draft.interventionList.length === 0)
          draft.loaders.interventionListLoading = true;
        break;

      case GET_INTERVENTION_LIST_SUCCESS:
        draft.loaders.interventionListLoading = false;
        draft.interventionList = action.payload.interventions;
        break;

      case GET_INTERVENTION_LIST_ERROR:
        draft.interventionList = draft.interventionList.length
          ? draft.interventionList
          : [draft.intervention];
        draft.loaders.interventionListLoading = false;
        break;
    }
  });

export default editInterventionPageReducer;
