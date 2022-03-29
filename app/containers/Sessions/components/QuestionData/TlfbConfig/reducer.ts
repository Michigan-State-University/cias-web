import { TlfbConfigDTO } from 'models/Question';
import { getDiffBetweenDatesInDays } from 'utils/dateUtils';

import {
  UPDATE_DAYS_COUNT,
  UPDATE_RANGE_SETTINGS,
  UPDATE_DATE_RANGE,
} from './constants';

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
      if (!selected) {
        question.body.data[0].payload.start_date = '';
        question.body.data[0].payload.end_date = '';
      }
      return question;
    }
    case UPDATE_DATE_RANGE: {
      const {
        data: { startDate, endDate },
      } = payload;
      question.body.data[0].payload.start_date = startDate?.toISOString() || '';
      question.body.data[0].payload.end_date = endDate?.toISOString() || '';
      if (startDate && endDate) {
        const diffDays = getDiffBetweenDatesInDays(startDate, endDate);
        question.body.data[0].payload.days_count = `${diffDays}`;
      }
      return question;
    }
    default:
      return question;
  }
};

export default tlfbConfigReducer;
