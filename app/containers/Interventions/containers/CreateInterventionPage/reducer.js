/*
 *
 * CreateInterventionPage reducer
 *
 */
import produce from 'immer';
import Intervention from 'models/Intervention/Intervention';
import Question from 'models/Intervention/Question';
import { singleQuestion } from 'models/Intervention/QuestionTypes';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  intervention: new Intervention('', '', [
    new Question(
      'I can address any health behavior. For example, I might ask a patient if they are a daily smoker.',
      singleQuestion,
      {
        0: 'Answer 1',
        1: 'Answer 2',
        2: 'Answer 3',
      },
    ),
  ]),
};

/* eslint-disable default-case, no-param-reassign */
const createInterventionPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default createInterventionPageReducer;
