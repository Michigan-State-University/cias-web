import produce from 'immer';
import set from 'lodash/set';
import Intervention from 'models/Intervention/Intervention';

import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_SUCCESS,
  GET_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
} from './constants';

export const initialState = {
  intervention: new Intervention('', ''),
  loaders: {
    createIntervention: false,
    getIntervention: false,
    editIntervention: false,
  },
  cache: {
    intervention: new Intervention('', ''),
  },
};

/* eslint-disable default-case, no-param-reassign */
const interventionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_INTERVENTION_REQUEST:
        draft.loaders.createIntervention = true;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.loaders.createIntervention = false;
        break;
      case CREATE_INTERVENTION_ERROR:
        draft.loaders.createIntervention = false;
        break;

      case GET_INTERVENTION_REQUEST:
        draft.loaders.getIntervention = true;
        break;
      case GET_INTERVENTION_SUCCESS:
        draft.loaders.getIntervention = false;
        draft.intervention = action.payload.intervention;
        draft.cache.intervention = action.payload.intervention;
        break;
      case GET_INTERVENTION_ERROR:
        draft.loaders.getIntervention = false;
        break;

      case EDIT_INTERVENTION_REQUEST:
        set(draft.intervention, action.payload.path, action.payload.value);
        break;
      case EDIT_INTERVENTION_SUCCESS:
        draft.intervention = action.payload.intervention;
        draft.cache.intervention = action.payload.intervention;
        break;
      case EDIT_INTERVENTION_ERROR:
        break;
    }
  });

export { interventionReducer };
