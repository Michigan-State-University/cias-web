import produce from 'immer';
import Intervention from 'models/Intervention/Intervention';
import Question from 'models/Intervention/Question';
import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  ADD_QUESTION,
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
} from './constants';
import questionDataReducer from '../../components/QuestionData/reducer';

export const initialState = {
  intervention: new Intervention('e-Intervention New', ''),
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
      case ADD_QUESTION:
        draft.questions.push(new Question('New question', action.payload, {}));
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
    }
  });

export default editInterventionPageReducer;
