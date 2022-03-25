import { TlfbConfigDTO } from 'models/Question';

import { UPDATE_DAYS_COUNT, UPDATE_RANGE_SETTINGS } from './constants';

/* eslint-disable no-param-reassign */
const tlfbConfigReducer = (question: TlfbConfigDTO, payload: any) => {
  switch (payload.type) {
    case UPDATE_DAYS_COUNT: {
      const {
        data: { daysCount },
      } = payload;
      question.body.data[0].payload.days_count = daysCount;
      return question;
    }
    case UPDATE_RANGE_SETTINGS: {
      const {
        data: { selected },
      } = payload;
      question.body.data[0].payload.choose_date_range = selected;
      return question;
    }
    default:
      return question;
  }
};

export default tlfbConfigReducer;
