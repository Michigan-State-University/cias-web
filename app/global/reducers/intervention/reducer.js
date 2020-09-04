import produce from 'immer';
import set from 'lodash/set';
import Intervention from 'models/Intervention/Intervention';

import {
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_ERROR,
  COPY_QUESTION_REQUEST,
  COPY_QUESTION_ERROR,
  COPY_QUESTION_SUCCESS,
  UPDATE_QUESTION_DATA,
  DELETE_QUESTION_REQUEST,
  UPDATE_CACHE,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_QUESTION_IMAGE,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
} from 'containers/Interventions/containers/EditInterventionPage/constants';
import {
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_SUCCESS,
  GET_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
} from './constants';

export const initialState = {
  intervention: new Intervention('', ''),
  interventionSaving: false,
  loaders: {
    createIntervention: false,
    getIntervention: false,
    editIntervention: false,
  },
  cache: {
    intervention: new Intervention('', ''),
  },
};

const saving = [
  EDIT_INTERVENTION_REQUEST,
  EDIT_QUESTION_REQUEST,
  COPY_QUESTION_REQUEST,
  UPDATE_QUESTION_DATA,
  DELETE_QUESTION_REQUEST,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_QUESTION_IMAGE,
  CREATE_QUESTION_REQUEST,
];
const saved = [
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  COPY_QUESTION_ERROR,
  COPY_QUESTION_SUCCESS,
  UPDATE_CACHE,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
];

/* eslint-disable default-case, no-param-reassign */
const interventionReducer = (state = initialState, action) =>
  produce(state, draft => {
    if (saving.includes(action.type)) draft.interventionSaving = true;
    if (saved.includes(action.type)) draft.interventionSaving = false;
    switch (action.type) {
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
