import cloneDeep from 'lodash/cloneDeep';
import { CHANGE_FORMULA_MATCH, CHANGE_CONTENT } from './constants';

/**
 * @param  {TextMessage} variant
 * @param  {object} payload
 */
const textMessageVariantReducer = (variant, payload) => {
  const clonedVariant = cloneDeep(variant);
  switch (payload.type) {
    case CHANGE_FORMULA_MATCH:
    case CHANGE_CONTENT:
      clonedVariant[payload.data.field] = payload.data.value;
      return clonedVariant;

    default:
      return clonedVariant;
  }
};

export default textMessageVariantReducer;
