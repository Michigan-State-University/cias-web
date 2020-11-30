import { updateInterventionSettings } from '../actions';
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

export const updateFormula = (value, interventionId) =>
  updateInterventionSettings(
    {
      type: UPDATE_FORMULA,
      data: { value, interventionId },
    },
    ['formula'],
  );

export const addFormulaCase = interventionId =>
  updateInterventionSettings(
    {
      type: ADD_FORMULA_CASE,
      data: { interventionId },
    },
    ['formula'],
  );

export const removeFormulaCase = (index, interventionId) =>
  updateInterventionSettings(
    {
      type: REMOVE_FORMULA_CASE,
      data: { index, interventionId },
    },
    ['formula'],
  );

export const updateFormulaCase = (index, value, interventionId) =>
  updateInterventionSettings(
    {
      type: UPDATE_FORMULA_CASE,
      data: { index, value, interventionId },
    },
    ['formula'],
  );

export const changeFormulaStatus = (value, interventionId) =>
  updateInterventionSettings(
    {
      type: CHANGE_FORMULA_STATUS,
      data: { value, interventionId },
    },
    ['settings.formula'],
  );

export const changeSchedulingType = (value, interventionId) =>
  updateInterventionSettings(
    {
      type: CHANGE_SCHEDULING_TYPE,
      data: { value, interventionId },
    },
    ['schedule', 'schedule_at', 'schedule_payload'],
  );

export const updateSchedulingPayload = (value, interventionId) =>
  updateInterventionSettings(
    {
      type: UPDATE_SCHEDULING_PAYLOAD,
      data: { value, interventionId },
    },
    ['schedule', 'schedule_at', 'schedule_payload'],
  );

export const updateSchedulingDate = (value, interventionId) =>
  updateInterventionSettings(
    {
      type: UPDATE_SCHEDULING_DATE,
      data: { value, interventionId },
    },
    ['schedule', 'schedule_at', 'schedule_payload'],
  );
