import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const visualAnalogueScaleQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_DATA:
      const { value, label } = payload.data;
      question.body.data[0].payload[label] = value;
      return question;
    case UPDATE_VARIABLE:
      question.body.variable.name = payload.data.name;
      return question;
    default:
      return question;
  }
};

export default visualAnalogueScaleQuestionReducer;
