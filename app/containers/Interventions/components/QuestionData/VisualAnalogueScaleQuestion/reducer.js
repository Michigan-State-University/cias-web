import { UPDATE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const visualAnalogueScaleQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE:
      const { value, label } = payload.data;
      question.body.data[0].payload[label] = value;
      return question;
    default:
      return question;
  }
};

export default visualAnalogueScaleQuestionReducer;
