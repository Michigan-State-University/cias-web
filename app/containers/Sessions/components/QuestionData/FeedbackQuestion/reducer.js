import set from 'lodash/set';

import {
  UPDATE_DATA,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
} from './constants';

/* eslint-disable default-case, no-param-reassign, default-param-last */
const feedbackQuestionReducer = (question, payload) => {
  const questionData = question.body.data;
  switch (payload.type) {
    case UPDATE_DATA:
      const { value, label } = payload.data;
      set(questionData[0], ['payload', label], value);
      return question;

    case UPDATE_FORMULA:
      set(questionData[0], ['spectrum', 'payload'], payload.data.value);
      return question;

    case ADD_FORMULA_CASE:
      questionData[0].spectrum.patterns.push({ match: '=', target: '' });
      return question;

    case REMOVE_FORMULA_CASE:
      questionData[0].spectrum.patterns.splice(payload.data.index, 1);
      return question;

    case UPDATE_FORMULA_CASE:
      set(
        questionData[0],
        ['spectrum', 'patterns', payload.data.index],
        payload.data.value,
      );
      return question;

    default:
      return question;
  }
};

export default feedbackQuestionReducer;
