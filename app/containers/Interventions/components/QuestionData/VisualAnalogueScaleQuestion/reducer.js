import { UPDATE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const visualAnalogueScaleQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE:
      const { value, index } = payload.data;
      question.body.data[index].payload = value;
      return question;
    default:
      return question;
  }
};

export default visualAnalogueScaleQuestionReducer;
