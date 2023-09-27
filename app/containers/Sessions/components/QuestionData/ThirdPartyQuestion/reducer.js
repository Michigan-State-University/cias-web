import { UPDATE_VARIABLE } from 'global/reducers/questions/constants';

import { ADD, UPDATE_ANSWER, REMOVE, REORDER } from './constants';

/* eslint-disable default-case, no-param-reassign */
const thirdPartyQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      if (!question.body.data) {
        question.body.data = [];
      }

      question.body.data.push({
        value: '',
        payload: '',
        report_template_ids: [],
        numeric_value: '',
      });
      return question;
    case UPDATE_ANSWER:
      const { index, changes } = payload.data;
      question.body.data[index] = {
        ...question.body.data[index],
        ...changes,
      };
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

export default thirdPartyQuestionReducer;
