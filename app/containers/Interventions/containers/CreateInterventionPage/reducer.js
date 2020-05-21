/*
 *
 * CreateInterventionPage reducer
 *
 */
import produce from 'immer';
import Intervention from 'models/Intervention/Intervention';
import Question from 'models/Intervention/Question';
import { singleQuestion } from 'models/Intervention/QuestionTypes';
import { TOGGLE_QUESTION_TYPE_CHOOSER, ADD_QUESTION } from './constants';

export const initialState = {
  intervention: new Intervention('e-Intervention New', ''),
  questions: [
    new Question(
      'I can address any health behavior. For example, I might ask a patient if they are a daily smoker.',
      singleQuestion,
      {
        0: 'Answer 1',
        1: 'Answer 2',
        2: 'Answer 3',
      },
    ),
  ],
  questionTypeChooserVisibility: false,
};

/* eslint-disable default-case, no-param-reassign */
const createInterventionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_QUESTION_TYPE_CHOOSER:
        draft.questionTypeChooserVisibility = !draft.questionTypeChooserVisibility;
        break;
      case ADD_QUESTION:
        draft.questions.push(new Question('New question', action.payload, {}));
    }
  });

export default createInterventionPageReducer;
