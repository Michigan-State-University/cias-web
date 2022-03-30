import { updateSessionSettings } from '../actions';
import {
  ADD_FORMULA_CASE,
  CHANGE_FORMULA_STATUS,
  CHANGE_SCHEDULING_TYPE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA,
  UPDATE_FORMULA_CASE,
  UPDATE_SCHEDULING_PAYLOAD,
  UPDATE_SCHEDULING_DATE,
  UPDATE_DAYS_AFTER_DATE_VARIABLE,
  ADD_FORMULA_TARGET,
  UPDATE_FORMULA_TARGET,
  REMOVE_FORMULA_TARGET,
  ADD_NEW_FORMULA,
  REMOVE_FORMULA,
} from './constants';

export const updateFormula = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_FORMULA,
      data: { value, sessionId },
    },
    ['formula'],
  );

export const addFormulaCase = sessionId =>
  updateSessionSettings(
    {
      type: ADD_FORMULA_CASE,
      data: { sessionId },
    },
    ['formula'],
  );

export const removeFormulaCase = (index, sessionId) =>
  updateSessionSettings(
    {
      type: REMOVE_FORMULA_CASE,
      data: { index, sessionId },
    },
    ['formula'],
  );

export const updateFormulaCase = (index, value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_FORMULA_CASE,
      data: { index, value, sessionId },
    },
    ['formula'],
  );

export const changeFormulaStatus = (value, sessionId) =>
  updateSessionSettings(
    {
      type: CHANGE_FORMULA_STATUS,
      data: { value, sessionId },
    },
    ['settings'],
  );

export const changeSchedulingType = (value, sessionId) =>
  updateSessionSettings(
    {
      type: CHANGE_SCHEDULING_TYPE,
      data: { value, sessionId },
    },
    [
      'schedule',
      'schedule_at',
      'schedule_payload',
      'days_after_date_variable_name',
    ],
  );

export const updateSchedulingPayload = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_SCHEDULING_PAYLOAD,
      data: { value, sessionId },
    },
    [
      'schedule',
      'schedule_at',
      'schedule_payload',
      'days_after_date_variable_name',
    ],
  );

export const updateSchedulingDate = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_SCHEDULING_DATE,
      data: { value, sessionId },
    },
    [
      'schedule',
      'schedule_at',
      'schedule_payload',
      'days_after_date_variable_name',
    ],
  );

export const updateDaysAfterDateVariable = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_DAYS_AFTER_DATE_VARIABLE,
      data: { value, sessionId },
    },
    [
      'schedule',
      'schedule_at',
      'schedule_payload',
      'days_after_date_variable_name',
    ],
  );

export const addFormulaTarget = (sessionId, patternIndex) =>
  updateSessionSettings({
    type: ADD_FORMULA_TARGET,
    data: { sessionId, patternIndex },
  });

export const updateFormulaTarget = (
  sessionId,
  patternIndex,
  targetIndex,
  targetData,
) =>
  updateSessionSettings({
    type: UPDATE_FORMULA_TARGET,
    data: { sessionId, patternIndex, targetIndex, targetData },
  });

export const removeFormulaTarget = (sessionId, patternIndex, targetIndex) =>
  updateSessionSettings({
    type: REMOVE_FORMULA_TARGET,
    data: { sessionId, patternIndex, targetIndex },
  });

export const removeFormula = (sessionId, formulaIndex) =>
  updateSessionSettings({
    type: REMOVE_FORMULA,
    data: { sessionId, formulaIndex },
  });

export const addNewFormula = sessionId =>
  updateSessionSettings({
    type: ADD_NEW_FORMULA,
    data: { sessionId },
  });
