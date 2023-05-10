import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import { removeAt } from 'utils/arrayUtils';

import {
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  CHANGE_FORMULA_STATUS,
  CHANGE_SCHEDULING_TYPE,
  UPDATE_SCHEDULING_PAYLOAD,
  UPDATE_SCHEDULING_DATE,
  UPDATE_DAYS_AFTER_DATE_VARIABLE,
  ADD_FORMULA_TARGET,
  UPDATE_FORMULA_TARGET,
  REMOVE_FORMULA_TARGET,
  ADD_NEW_FORMULA,
  REMOVE_FORMULA,
  DUPLICATE_FORMULA,
} from './constants';

/* eslint-disable no-param-reassign */
const sessionSettingsReducer = (session, { type, data }) =>
  produce(session, (draft) => {
    switch (type) {
      case UPDATE_FORMULA: {
        const { formulaIndex, value } = data;

        draft.formulas[formulaIndex].payload = value;
        break;
      }

      case CHANGE_FORMULA_STATUS: {
        const { value } = data;

        draft.settings.formula = value;
        break;
      }

      case ADD_FORMULA_CASE: {
        const { formulaIndex } = data;

        draft.formulas[formulaIndex].patterns.push({
          match: '=',
          target: [{ type: 'Session', id: '', probability: '100' }],
        });
        break;
      }

      case UPDATE_FORMULA_CASE: {
        const { formulaIndex, index, value } = data;

        draft.formulas[formulaIndex].patterns[index] = value;
        break;
      }

      case REMOVE_FORMULA_CASE: {
        const { formulaIndex, index } = data;

        removeAt(draft.formulas[formulaIndex].patterns, index);
        break;
      }

      case CHANGE_SCHEDULING_TYPE: {
        const { value } = data;

        draft.schedule = value;
        draft.scheduleAt = '';
        draft.schedulePayload = '';
        break;
      }

      case UPDATE_SCHEDULING_PAYLOAD: {
        const { value } = data;

        draft.schedulePayload = parseInt(value, 10) || '';
        break;
      }

      case UPDATE_SCHEDULING_DATE: {
        const { value } = data;

        draft.scheduleAt = value;
        break;
      }

      case UPDATE_DAYS_AFTER_DATE_VARIABLE: {
        const { value } = data;

        draft.daysAfterDateVariableName = value;
        break;
      }

      case ADD_FORMULA_TARGET: {
        const { formulaIndex, patternIndex } = data;

        draft.formulas[formulaIndex].patterns[patternIndex].target.push({
          type: 'Session',
          id: '',
          probability: '0',
        });
        break;
      }

      case UPDATE_FORMULA_TARGET: {
        const { patternIndex, targetIndex, targetData, formulaIndex } = data;

        draft.formulas[formulaIndex].patterns[patternIndex].target[
          targetIndex
        ] = targetData;
        break;
      }

      case REMOVE_FORMULA_TARGET: {
        const { patternIndex, targetIndex, formulaIndex } = data;
        const { target } = draft.formulas[formulaIndex].patterns[patternIndex];

        removeAt(target, targetIndex);
        if (target.length === 1) {
          target[0].probability = '100';
        }
        break;
      }

      case ADD_NEW_FORMULA: {
        draft.formulas.push({ payload: '', patterns: [] });
        break;
      }

      case REMOVE_FORMULA: {
        const { formulaIndex } = data;

        removeAt(draft.formulas, formulaIndex);
        break;
      }

      case DUPLICATE_FORMULA: {
        const { formulaIndex } = data;

        const newFormula = cloneDeep(draft.formulas[formulaIndex]);
        draft.formulas.push(newFormula);
        break;
      }

      default:
        return draft;
    }
  });

export default sessionSettingsReducer;
