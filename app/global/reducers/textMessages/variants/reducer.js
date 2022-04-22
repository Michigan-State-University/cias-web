/* eslint-disable no-param-reassign */
import produce from 'immer';
import { CHANGE_FORMULA_MATCH, CHANGE_CONTENT } from './constants';

/**
 * @param  {TextMessage} variant
 * @param  {object} payload
 */
const textMessageVariantReducer = (variant, payload) =>
  produce(variant, (draft) => {
    switch (payload.type) {
      case CHANGE_FORMULA_MATCH:
      case CHANGE_CONTENT:
        draft[payload.data.field] = payload.data.value;
        break;

      default:
    }
  });

export default textMessageVariantReducer;
