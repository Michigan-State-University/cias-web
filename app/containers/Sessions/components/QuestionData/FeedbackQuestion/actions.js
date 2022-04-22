import { updateQuestionData } from 'global/reducers/questions';

import {
  UPDATE_DATA,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
} from './constants';

export const updateLabel = (value, label) =>
  updateQuestionData({ type: UPDATE_DATA, data: { value, label } });

export const updateFormula = (value, questionId) =>
  updateQuestionData({
    type: UPDATE_FORMULA,
    data: { value, questionId },
  });

export const addFormulaCase = (questionId) =>
  updateQuestionData({
    type: ADD_FORMULA_CASE,
    data: { questionId },
  });

export const removeFormulaCase = (index, questionId) =>
  updateQuestionData({
    type: REMOVE_FORMULA_CASE,
    data: { index, questionId },
  });

export const updateFormulaCase = (index, value, questionId) =>
  updateQuestionData({
    type: UPDATE_FORMULA_CASE,
    data: { index, value, questionId },
  });
