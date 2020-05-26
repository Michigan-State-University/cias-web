import { ADD, UPDATE, REMOVE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const singleQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      const answerCount = question.body.length;
      question.body.push({
        variable: '',
        payload: `Answer ${answerCount + 1}`,
      });
      return question;
    case UPDATE:
      const { index, value } = payload.data;
      question.body[index] = value;
      return question;
    case REMOVE:
      question.body.splice(payload.data.index, 1);
      return question;
    default:
      return question;
  }
};

export default singleQuestionReducer;
