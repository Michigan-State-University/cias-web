import { updateQuestionData } from 'global/reducers/questions';

import { UPDATE_DAYS_COUNT, UPDATE_RANGE_SETTINGS } from './constants';

export const updateDaysCount = (daysCount: string) =>
  updateQuestionData({
    type: UPDATE_DAYS_COUNT,
    data: { daysCount },
  });

export const updateRangeSetting = (selected: boolean) =>
  updateQuestionData({
    type: UPDATE_RANGE_SETTINGS,
    data: { selected },
  });
