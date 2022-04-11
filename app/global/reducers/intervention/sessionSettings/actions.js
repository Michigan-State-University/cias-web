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
  DUPLICATE_FORMULA,
} from './constants';

export const updateFormula = (value, sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: UPDATE_FORMULA,
      data: { value, sessionId, formulaIndex },
    },
    ['formulas'],
  );

export const addFormulaCase = (sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: ADD_FORMULA_CASE,
      data: { sessionId, formulaIndex },
    },
    ['formulas'],
  );

export const removeFormulaCase = (index, sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: REMOVE_FORMULA_CASE,
      data: { index, sessionId, formulaIndex },
    },
    ['formulas'],
  );

export const updateFormulaCase = (index, value, sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: UPDATE_FORMULA_CASE,
      data: { index, value, sessionId, formulaIndex },
    },
    ['formulas'],
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

export const addFormulaTarget = (sessionId, patternIndex, formulaIndex) =>
  updateSessionSettings({
    type: ADD_FORMULA_TARGET,
    data: { sessionId, patternIndex, formulaIndex },
  });

export const updateFormulaTarget = (
  sessionId,
  patternIndex,
  targetIndex,
  targetData,
  formulaIndex,
) =>
  updateSessionSettings({
    type: UPDATE_FORMULA_TARGET,
    data: { sessionId, patternIndex, targetIndex, targetData, formulaIndex },
  });

export const removeFormulaTarget = (
  sessionId,
  patternIndex,
  targetIndex,
  formulaIndex,
) =>
  updateSessionSettings({
    type: REMOVE_FORMULA_TARGET,
    data: { sessionId, patternIndex, targetIndex, formulaIndex },
  });

export const removeFormula = (sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: REMOVE_FORMULA,
      data: { sessionId, formulaIndex },
    },
    ['formulas'],
  );

export const addNewFormula = (sessionId) =>
  updateSessionSettings(
    {
      type: ADD_NEW_FORMULA,
      data: { sessionId },
    },
    ['formulas'],
  );

export const duplicateFormula = (sessionId, formulaIndex) =>
  updateSessionSettings(
    {
      type: DUPLICATE_FORMULA,
      data: { sessionId, formulaIndex },
    },
    ['formulas'],
  );
