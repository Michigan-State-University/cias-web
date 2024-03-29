import { updateQuestionData } from 'global/reducers/questions/actions';

import {
  UPDATE_DAYS_COUNT,
  UPDATE_RANGE_SETTINGS,
  UPDATE_DATE_RANGE,
  UPDATE_DISPLAY_HELPING_MATERIALS,
} from './constants';

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

export const updateDateRange = (
  startDate: Nullable<Date>,
  endDate: Nullable<Date>,
) =>
  updateQuestionData({
    type: UPDATE_DATE_RANGE,
    data: { startDate, endDate },
  });

export const updateDisplayHelpingMaterials = (
  displayHelpingMaterials: boolean,
) =>
  updateQuestionData({
    type: UPDATE_DISPLAY_HELPING_MATERIALS,
    data: { displayHelpingMaterials },
  });
