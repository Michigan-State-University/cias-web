import {
  ADD,
  UPDATE_ANSWER,
  REMOVE,
  UPDATE_VARIABLE,
  REORDER,
} from './constants';

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

export default thirdPartyQuestionReducer;
