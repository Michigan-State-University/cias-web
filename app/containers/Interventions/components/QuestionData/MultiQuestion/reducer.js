import { ADD, UPDATE, REMOVE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const multiQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      if (!question.body.data) {
        question.body.data = [];
      }

      const answerCount = question.body.data.length;

      question.body.data.push({
        variable: '',
        payload: `Answer ${answerCount + 1}`,
      });
      return question;
    case UPDATE:
      const { index, value } = payload.data;
      question.body.data[index] = value;
      return question;
    case REMOVE:
      question.body.data.splice(payload.data.index, 1);
      return question;
    default:
      return question;
  }
};

export default multiQuestionReducer;
