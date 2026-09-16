import { calculateNextValue } from 'utils/sequenceUtils';
import { UPDATE_VARIABLE } from 'global/reducers/questions/constants';

import { HenryFordQuestionDTO } from 'models/Question';
import { ADD, UPDATE_ANSWER, REMOVE, REORDER } from './constants';

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
const henryFordQuestionReducer = (
  question: HenryFordQuestionDTO,
  payload: any,
) => {
  switch (payload.type) {
    case ADD:
      if (!question.body.data) {
        question.body.data = [];
      }

      question.body.data.push({
        value: `${calculateNextValue(
          question.body.data.map(({ value }) => +value),
        )}`,
        hfh_value: '',
        payload: '',
      });
      return question;
    case UPDATE_ANSWER:
      const { index, value } = payload.data;
      question.body.data[index] = value;
      return question;
    case UPDATE_VARIABLE:
      question.body.variable.name = payload.data.name;
      return question;
    case REMOVE:
      question.body.data.splice(payload.data.index, 1);
      return question;
    case REORDER:
      question.body.data = payload.data.items;
      return question;
    default:
      return question;
  }
};

export default henryFordQuestionReducer;
