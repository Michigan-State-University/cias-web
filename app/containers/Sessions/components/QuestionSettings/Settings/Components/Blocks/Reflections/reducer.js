import produce from 'immer';
import assign from 'lodash/assign';

import { removeAt } from 'utils/arrayUtils';

import {
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
} from './constants';

/* eslint-disable no-param-reassign */
const reflectionFormulaBlockReducer = (block, { data, type }) =>
  produce(block, (draft) => {
    const { index, value } = data;

    switch (type) {
      case UPDATE_FORMULA: {
        draft.payload = value;
        break;
      }

      case ADD_FORMULA_CASE: {
        draft.reflections.push({
          match: '=',
          text: [],
          audio_urls: [],
          sha256: [],
        });
        break;
      }

      case REMOVE_FORMULA_CASE: {
        removeAt(draft.reflections, index);
        break;
      }

      case UPDATE_FORMULA_CASE: {
        assign(draft.reflections[index], value);
        break;
      }

      default:
        return draft;
    }
  });

export default reflectionFormulaBlockReducer;
