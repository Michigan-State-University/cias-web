import { calculateNextValue } from 'utils/sequenceUtils';

import { ADD, UPDATE, REMOVE, REORDER } from './constants';

/* eslint-disable default-case, no-param-reassign */
const multiQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      if (!question.body.data) {
        question.body.data = [];
      }

      question.body.data.push({
        variable: {
          name: '',
          value: `${calculateNextValue(
            question.body.data.map(({ variable: { value } }) => +value),
          )}`,
        },
        payload: '',
      });
      return question;
    case UPDATE:
      const { index, value } = payload.data;
      question.body.data[index] = value;
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

export default multiQuestionReducer;
