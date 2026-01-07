import { calculateNextValue } from 'utils/sequenceUtils';

import {
  ADD,
  ADD_NONE_OF_THE_ABOVE,
  UPDATE,
  REMOVE,
  REMOVE_NONE_OF_THE_ABOVE,
  REORDER,
} from './constants';

/* eslint-disable default-case, no-param-reassign, default-param-last */
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
    case ADD_NONE_OF_THE_ABOVE:
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
        none_of_above: true,
      });
      return question;
    case UPDATE:
      const { index, value } = payload.data;
      question.body.data[index] = value;
      return question;
    case REMOVE:
      question.body.data.splice(payload.data.index, 1);
      return question;
    case REMOVE_NONE_OF_THE_ABOVE:
      question.body.data = question.body.data.filter(
        (item) => !item.none_of_above,
      );
      return question;
    case REORDER:
      question.body.data = payload.data.items;
      return question;
    default:
      return question;
  }
};

export default multiQuestionReducer;
