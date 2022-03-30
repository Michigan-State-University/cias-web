import cloneDeep from 'lodash/cloneDeep';
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

const sessionSettingsReducer = (session, payload) => {
  const clonedSession = cloneDeep(session);
  switch (payload.type) {
    case UPDATE_FORMULA: {
      const { formulaIndex, value } = payload.data;
      clonedSession.formulas[formulaIndex].payload = value;
      return clonedSession;
    }

    case CHANGE_FORMULA_STATUS:
      clonedSession.settings.formula = payload.data.value;
      return clonedSession;

    case ADD_FORMULA_CASE: {
      const { formulaIndex } = payload.data;
      clonedSession.formulas[formulaIndex].patterns.push({
        match: '=',
        target: [{ type: 'Session', id: '', probability: '100' }],
      });
      return clonedSession;
    }

    case UPDATE_FORMULA_CASE: {
      const { formulaIndex } = payload.data;
      clonedSession.formulas[formulaIndex].patterns[payload.data.index] =
        payload.data.value;
      return clonedSession;
    }

    case REMOVE_FORMULA_CASE: {
      const { formulaIndex } = payload.data;
      clonedSession.formulas[formulaIndex].patterns.splice(
        payload.data.index,
        1,
      );
      return clonedSession;
    }

    case CHANGE_SCHEDULING_TYPE:
      clonedSession.schedule = payload.data.value;
      clonedSession.schedule_at = '';
      clonedSession.schedule_payload = '';
      return clonedSession;

    case UPDATE_SCHEDULING_PAYLOAD:
      clonedSession.schedule_payload = parseInt(payload.data.value, 10) || '';

      return clonedSession;

    case UPDATE_SCHEDULING_DATE:
      clonedSession.schedule_at = payload.data.value;
      return clonedSession;

    case UPDATE_DAYS_AFTER_DATE_VARIABLE:
      clonedSession.days_after_date_variable_name = payload.data.value;
      return clonedSession;

    case ADD_FORMULA_TARGET: {
      const { formulaIndex } = payload.data;
      clonedSession.formulas[formulaIndex].patterns[
        payload.data.patternIndex
      ].target.push({
        type: 'Session',
        id: '',
        probability: '0',
      });
      return clonedSession;
    }

    case UPDATE_FORMULA_TARGET: {
      const {
        patternIndex,
        targetIndex,
        targetData,
        formulaIndex,
      } = payload.data;
      clonedSession.formulas[formulaIndex].patterns[patternIndex].target[
        targetIndex
      ] = targetData;
      return clonedSession;
    }

    case REMOVE_FORMULA_TARGET: {
      const { patternIndex, targetIndex, formulaIndex } = payload.data;
      const newTargets = clonedSession.formulas[formulaIndex].patterns[
        patternIndex
      ].target.filter((_, deleteIndex) => deleteIndex !== targetIndex);
      clonedSession.formulas[formulaIndex].patterns[patternIndex].target =
        newTargets.length === 1
          ? [{ ...newTargets[0], probability: '100' }]
          : newTargets;
      return clonedSession;
    }

    case ADD_NEW_FORMULA: {
      clonedSession.formulas = [
        ...clonedSession.formulas,
        { payload: '', patterns: [] },
      ];
      return clonedSession;
    }

    case REMOVE_FORMULA: {
      const { formulaIndex } = payload.data;
      const newFormulas = clonedSession.formulas.filter(
        (_, deleteIndex) => deleteIndex !== formulaIndex,
      );
      clonedSession.formulas = newFormulas;
      return clonedSession;
    }

    case DUPLICATE_FORMULA: {
      const { formulaIndex } = payload.data;
      const newFormulas = [
        ...clonedSession.formulas,
        cloneDeep(clonedSession.formulas[formulaIndex]),
      ];
      clonedSession.formulas = newFormulas;
      return clonedSession;
    }

    default:
      return session;
  }
};

export default sessionSettingsReducer;
