import produce from 'immer';
import _ from 'lodash';
import Intervention from 'models/Intervention/Intervention';

import {
  textboxQuestion,
  numberQuestion,
  gridQuestion,
} from 'models/Intervention/QuestionTypes';

import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  GET_INTERVENTION_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_ERROR,
} from './constants';

import questionDataReducer from '../../components/QuestionData/reducer';

export const initialState = {
  intervention: new Intervention('', ''),
  questions: [],
  questionTypeChooserVisibility: false,
  selectedQuestion: 0,
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
            : [{ variable: '', payload: '' }],
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
                  variable: '',
                  payload: {
                    rows: [
                      { variable: '', payload: '' },
                      { variable: '', payload: '' },
                    ],
                    columns: [
                      { variable: '', payload: '' },
                      { variable: '', payload: '' },
                      { variable: '', payload: '' },
                    ],
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
      case TOGGLE_QUESTION_TYPE_CHOOSER:
        draft.questionTypeChooserVisibility = !draft.questionTypeChooserVisibility;
        break;

      case SELECT_QUESTION:
        draft.selectedQuestion = action.payload;
        break;

      case UPDATE_QUESTION_TITLE:
        draft.questions[state.selectedQuestion] = Object.assign(
          {},
          draft.questions[state.selectedQuestion],
          { title: action.payload },
        );
        break;

      case UPDATE_QUESTION_DATA:
        draft.questions[state.selectedQuestion] = Object.assign(
          {},
          draft.questions[state.selectedQuestion],
          questionDataReducer(
            state.questions[state.selectedQuestion],
            action.payload,
          ),
        );
        break;

      case UPDATE_QUESTION_SUCCESS:
        draft.cache.questions[state.selectedQuestion] = mapQuestionDataForType(
          action.payload.question,
        );
        break;

      case UPDATE_QUESTION_ERROR:
        draft.questions[state.selectedQuestion] = _.cloneDeep(
          draft.cache.questions[state.selectedQuestion],
        );
        break;

      case CREATE_QUESTION_SUCCESS:
        draft.cache.questions.push(
          mapQuestionDataForType(action.payload.question),
        );

        draft.questions = _.cloneDeep(draft.cache.questions);
        draft.questionTypeChooserVisibility = false;
        break;

      case GET_QUESTIONS_SUCCESS:
        draft.cache.questions = action.payload.questions.map(question =>
          mapQuestionDataForType(question),
        );

        draft.questions = _.cloneDeep(draft.cache.questions);
        break;

      case GET_INTERVENTION_SUCCESS:
        draft.cache.intervention = action.payload.intervention;

        draft.intervention = _.cloneDeep(draft.cache.intervention);
        break;
    }
  });

export default editInterventionPageReducer;
