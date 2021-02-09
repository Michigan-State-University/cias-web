import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { archived } from 'models/Status/StatusTypes';
import {
  COPY_INTERVENTION_SUCCESS,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
  ARCHIVE_INTERVENTION_ERROR,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
} from './constants';

import { CREATE_INTERVENTION_SUCCESS } from '../intervention';

export const initialState = {
  interventions: [],
  fetchInterventionLoading: true,
  fetchInterventionError: null,
  cache: {
    archiveIntervention: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const interventionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INTERVENTIONS_REQUEST:
        if (isEmpty(state.interventions)) draft.fetchInterventionLoading = true;
        draft.fetchInterventionError = null;
        break;
      case FETCH_INTERVENTIONS_SUCCESS:
        draft.fetchInterventionLoading = false;
        draft.interventions = action.payload.interventions;
        break;
      case FETCH_INTERVENTIONS_ERROR:
        draft.fetchInterventionLoading = false;
        draft.fetchInterventionError = action.payload.error;
        break;
      case CREATE_INTERVENTION_SUCCESS:
      case COPY_INTERVENTION_SUCCESS:
        draft.interventions = [
          ...state.interventions,
          action.payload.intervention,
        ];
        break;
      case ARCHIVE_INTERVENTION_REQUEST:
        let interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex].status = archived;
        draft.cache.archiveIntervention =
          state.interventions[interventionIndex];
        break;
      case ARCHIVE_INTERVENTION_SUCCESS:
        draft.cache.archiveIntervention = null;
        break;
      case ARCHIVE_INTERVENTION_ERROR:
        interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex] =
          state.cache.archiveIntervention;
        draft.cache.archiveIntervention = null;
        break;
    }
  });

export default interventionsReducer;
