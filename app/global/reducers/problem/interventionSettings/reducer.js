import cloneDeep from 'lodash/cloneDeep';
import {
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  CHANGE_FORMULA_STATUS,
  CHANGE_SCHEDULING_TYPE,
  UPDATE_SCHEDULING_VALUE,
} from './constants';

const interventionSettingsReducer = (intervention, payload) => {
  const clonedIntervention = cloneDeep(intervention);
  switch (payload.type) {
    case UPDATE_FORMULA:
      clonedIntervention.formula.payload = payload.data.value;
      return clonedIntervention;

    case CHANGE_FORMULA_STATUS:
      clonedIntervention.settings.formula = payload.data.value;
      return clonedIntervention;

    case ADD_FORMULA_CASE:
      clonedIntervention.formula.patterns.push({
        match: '',
        target: { type: 'Intervention', id: '' },
      });
      return clonedIntervention;

    case UPDATE_FORMULA_CASE:
      clonedIntervention.formula.patterns[payload.data.index] =
        payload.data.value;
      return clonedIntervention;

    case REMOVE_FORMULA_CASE:
      clonedIntervention.formula.patterns.splice(payload.data.index, 1);
      return clonedIntervention;

    case CHANGE_SCHEDULING_TYPE:
      clonedIntervention.schedule = payload.data.value;
      clonedIntervention.schedule_at = '';
      return clonedIntervention;

    case UPDATE_SCHEDULING_VALUE:
      clonedIntervention.schedule_at = payload.data.value;
      return clonedIntervention;

    default:
      return intervention;
  }
};

export default interventionSettingsReducer;
