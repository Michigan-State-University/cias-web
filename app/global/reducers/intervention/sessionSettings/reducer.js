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
} from './constants';

const sessionSettingsReducer = (session, payload) => {
  const clonedSession = cloneDeep(session);
  switch (payload.type) {
    case UPDATE_FORMULA:
      clonedSession.formula.payload = payload.data.value;
      return clonedSession;

    case CHANGE_FORMULA_STATUS:
      clonedSession.settings.formula = payload.data.value;
      return clonedSession;

    case ADD_FORMULA_CASE:
      clonedSession.formula.patterns.push({
        match: '=',
        target: [{ type: 'Session', id: '', probability: '100' }],
      });
      return clonedSession;

    case UPDATE_FORMULA_CASE:
      clonedSession.formula.patterns[payload.data.index] = payload.data.value;
      return clonedSession;

    case REMOVE_FORMULA_CASE:
      clonedSession.formula.patterns.splice(payload.data.index, 1);
      return clonedSession;

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

    case ADD_FORMULA_TARGET:
      clonedSession.formula.patterns[payload.data.patternIndex].target.push({
        type: 'Session',
        id: '',
        probability: '0',
      });
      return clonedSession;

    case UPDATE_FORMULA_TARGET: {
      const { patternIndex, targetIndex, targetData } = payload.data;
      clonedSession.formula.patterns[patternIndex].target[targetIndex] =
        targetData;
      return clonedSession;
    }

    case REMOVE_FORMULA_TARGET: {
      const { patternIndex, targetIndex } = payload.data;
      const newTargets = clonedSession.formula.patterns[
        patternIndex
      ].target.filter((_, deleteIndex) => deleteIndex !== targetIndex);
      clonedSession.formula.patterns[patternIndex].target = newTargets;
      return clonedSession;
    }

    default:
      return session;
  }
};

export default sessionSettingsReducer;
