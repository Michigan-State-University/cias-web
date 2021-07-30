import { updateTextMessageSettingsRequest } from '../actions';
import {
  CHANGE_SCHEDULING_TYPE,
  CHANGE_SCHEDULING_VALUE,
  CHANGE_SCHEDULING_FREQUENCY,
  CHANGE_FORMULA_VALUE,
  CHANGE_TILE_NAME,
  CHANGE_FORMULA_USED,
} from './constants';

export const changeSchedulingType = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_SCHEDULING_TYPE,
    data: { value, field: 'schedule' },
  });

export const changeSchedulingValue = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_SCHEDULING_VALUE,
    data: { value, field: 'schedulePayload' },
  });

export const changeSchedulingFrequency = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_SCHEDULING_FREQUENCY,
    data: { value, field: '' },
  });

export const changeFormulaValue = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_FORMULA_VALUE,
    data: { value, field: 'formula' },
  });
export const changeTileName = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_TILE_NAME,
    data: { value, field: 'name' },
  });

export const changeFormulaUsed = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_FORMULA_USED,
    data: { value, field: 'isUsedFormula' },
  });

export const changeNoFormulaText = (value) =>
  updateTextMessageSettingsRequest({
    type: CHANGE_FORMULA_USED,
    data: { value, field: 'noFormulaText' },
  });
