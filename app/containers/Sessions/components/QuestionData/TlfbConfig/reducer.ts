import { QuestionDTO } from 'models/Question';

import { UPDATE_DATA } from './constants';

/* eslint-disable no-param-reassign */
const tlfbConfigReducer = (question: QuestionDTO, payload: any) => {
  switch (payload.type) {
    case UPDATE_DATA:
      const { value } = payload.data;
      question.body.data[0] = value;
      return question;
    default:
      return question;
  }
};

export default tlfbConfigReducer;
