import set from 'lodash/set';
import get from 'lodash/get';
import assign from 'lodash/assign';

import {
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const reflectionFormulaBlockReducer = (block, { data, type }) => {
  const { index, value } = data;

  switch (type) {
    case UPDATE_FORMULA:
      set(block, 'payload', value);
      return block;

    case ADD_FORMULA_CASE:
      block.reflections.push({
        match: '',
        text: [],
        audio_urls: [],
        sha256: [],
      });
      return block;

    case REMOVE_FORMULA_CASE:
      block.reflections.splice(index, 1);
      return block;

    case UPDATE_FORMULA_CASE:
      set(
        block,
        ['reflections', index],
        assign(get(block, ['reflections', index]), value),
      );
      return block;

    default:
      return block;
  }
};

export default reflectionFormulaBlockReducer;
