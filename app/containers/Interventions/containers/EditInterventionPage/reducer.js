import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';
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
} from './constants';

import questionDataReducer from '../../components/QuestionData/reducer';
import questionSettingsReducer from '../../components/QuestionSettings/reducer';

export const initialState = {
  intervention: new Intervention('', ''),
  questions: [],
  questionSettingsVisibility: false,
  selectedQuestion: 0,
  previewAnimation: '',
  cache: {
    intervention: new Intervention('', ''),
    questions: [],
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

      case DELETE_QUESTION:
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.questionId,
        );
        // if (draft.selectedQuestion === 0 && draft.questions.length > 0)
        //   draft.selectedQuestion = 1;
        // else if (
        //   draft.selectedQuestion === draft.questions.length - 1 &&
        //   draft.questions.length > 0
        // )
        //   draft.selectedQuestion -= 1;
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

      case GET_QUESTIONS_SUCCESS:
        draft.cache.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );

        draft.questions = cloneDeep(draft.cache.questions);
        break;

      case GET_INTERVENTION_SUCCESS:
        draft.cache.intervention = action.payload.intervention;

        draft.intervention = cloneDeep(draft.cache.intervention);
        break;
    }
  });

export default editInterventionPageReducer;
