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
    ['schedule', 'schedule_at', 'schedule_payload'],
  );

export const updateSchedulingPayload = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_SCHEDULING_PAYLOAD,
      data: { value, sessionId },
    },
    ['schedule', 'schedule_at', 'schedule_payload'],
  );

export const updateSchedulingDate = (value, sessionId) =>
  updateSessionSettings(
    {
      type: UPDATE_SCHEDULING_DATE,
      data: { value, sessionId },
    },
    ['schedule', 'schedule_at', 'schedule_payload'],
  );
