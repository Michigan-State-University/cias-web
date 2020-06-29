import { ADD, UPDATE_ANSWER, REMOVE, UPDATE_VARIABLE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const singleQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      if (!question.body.data) {
        question.body.data = [];
      }

      const answerCount = question.body.data.length;

      question.body.data.push({
        variable: { value: '' },
        payload: `Answer ${answerCount + 1}`,
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
    default:
      return question;
  }
};

export default singleQuestionReducer;
