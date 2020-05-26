import produce from 'immer';
import Intervention from 'models/Intervention/Intervention';
import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  GET_INTERVENTION_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
} from './constants';
import questionDataReducer from '../../components/QuestionData/reducer';

export const initialState = {
  intervention: new Intervention('', ''),
  questions: [],
  questionTypeChooserVisibility: false,
  selectedQuestion: 0,
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

      case CREATE_QUESTION_SUCCESS:
        draft.questions.push(action.payload.question);
        break;

      case GET_INTERVENTION_SUCCESS:
        draft.intervention = action.payload.intervention;
        break;

      case GET_QUESTIONS_SUCCESS:
        draft.questions = action.payload.questions;
        break;

      case UPDATE_QUESTION_SUCCESS:
        draft.questions[state.selectedQuestion] = action.payload.question;
        break;
    }
  });

export default editInterventionPageReducer;
