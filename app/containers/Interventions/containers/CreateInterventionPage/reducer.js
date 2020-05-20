/*
 *
 * CreateInterventionPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import Intervention from '../../../../models/Intervention/Intervention';
import Screen from '../../../../models/Intervention/Screen';
import { singleQuestion } from '../../../../models/Intervention/ScreenTypes';
import Question from '../../../../models/Intervention/Question';
import Answer from '../../../../models/Intervention/Answer';

export const initialState = {
  intervention: new Intervention('', [
    new Screen(
      '',
      singleQuestion,
      new Question(
        'I can address any health behavior. For example, I might ask a patient if they are a daily smoker.',
        [
          new Answer('Answer 1'),
          new Answer('Answer 2'),
          new Answer('Answer 3'),
        ],
      ),
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
