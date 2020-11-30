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
} from './constants';

const interventionSettingsReducer = (session, payload) => {
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
        match: '',
        target: { type: 'Session', id: '' },
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

    default:
      return session;
  }
};

export default interventionSettingsReducer;
