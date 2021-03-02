import { updateTextMessageVariantRequest } from '../actions';
import { CHANGE_FORMULA_MATCH, CHANGE_CONTENT } from './constants';

export const changeFormulaMatch = (value, variantId) =>
  updateTextMessageVariantRequest({
    type: CHANGE_FORMULA_MATCH,
    data: { value, field: 'formulaMatch' },
    variantId,
  });

export const changeContent = (value, variantId) =>
  updateTextMessageVariantRequest({
    type: CHANGE_CONTENT,
    data: { value, field: 'content' },
    variantId,
  });
