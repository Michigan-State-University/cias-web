import { updateInterventionSettings } from '../actions';
import {
  ADD_FORMULA_CASE,
  CHANGE_FORMULA_STATUS,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA,
  UPDATE_FORMULA_CASE,
} from './constants';

export const updateFormula = (value, interventionId) =>
  updateInterventionSettings({
    type: UPDATE_FORMULA,
    data: { value, interventionId },
  });

export const addFormulaCase = interventionId =>
  updateInterventionSettings({
    type: ADD_FORMULA_CASE,
    data: { interventionId },
  });

export const removeFormulaCase = (index, interventionId) =>
  updateInterventionSettings({
    type: REMOVE_FORMULA_CASE,
    data: { index, interventionId },
  });

export const updateFormulaCase = (index, value, interventionId) =>
  updateInterventionSettings({
    type: UPDATE_FORMULA_CASE,
    data: { index, value, interventionId },
  });

export const changeFormulaStatus = (value, interventionId) =>
  updateInterventionSettings({
    type: CHANGE_FORMULA_STATUS,
    data: { value, interventionId },
  });
