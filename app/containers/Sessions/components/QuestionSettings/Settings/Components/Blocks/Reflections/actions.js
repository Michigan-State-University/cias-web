import { updateReflectionFormulaBlock } from '../../../actions';
import {
  REMOVE_FORMULA_CASE,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA,
  UPDATE_FORMULA_CASE,
} from './constants';

export const updateFormula = (value, questionId, blockIndex) =>
  updateReflectionFormulaBlock(blockIndex, questionId, {
    type: UPDATE_FORMULA,
    data: { value },
  });

export const addFormulaCase = (questionId, blockIndex) =>
  updateReflectionFormulaBlock(blockIndex, questionId, {
    type: ADD_FORMULA_CASE,
    data: {},
  });

export const removeFormulaCase = (index, questionId, blockIndex) =>
  updateReflectionFormulaBlock(blockIndex, questionId, {
    type: REMOVE_FORMULA_CASE,
    data: { index },
  });

export const updateFormulaCase = (index, value, questionId, blockIndex) =>
  updateReflectionFormulaBlock(blockIndex, questionId, {
    type: UPDATE_FORMULA_CASE,
    data: { index, value },
  });
