import { TlfbConfigDTO } from 'models/Question';

import { UPDATE_DAYS_COUNT, UPDATE_RANGE_SETTINGS } from './constants';

/* eslint-disable no-param-reassign */
const tlfbConfigReducer = (question: TlfbConfigDTO, payload: any) => {
  switch (payload.type) {
    case UPDATE_DAYS_COUNT: {
      const { data } = payload;
      question.body.data[0].payload.days_count = data;
      return question;
    }
    case UPDATE_RANGE_SETTINGS: {
      const { data } = payload;
      question.body.data[0].payload.choose_date_range = data;
      return question;
    }
    default:
      return question;
  }
};

export default tlfbConfigReducer;
