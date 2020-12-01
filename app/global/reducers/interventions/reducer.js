import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { archived } from 'models/Status/StatusTypes';
import {
  COPY_PROBLEM_SUCCESS,
  FETCH_PROBLEMS_ERROR,
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_SUCCESS,
  ARCHIVE_PROBLEM_ERROR,
  ARCHIVE_PROBLEM_REQUEST,
  ARCHIVE_PROBLEM_SUCCESS,
} from './constants';

import { CREATE_PROBLEM_SUCCESS } from '../intervention';

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
      case FETCH_PROBLEMS_REQUEST:
        if (isEmpty(state.interventions)) draft.fetchInterventionLoading = true;
        draft.fetchInterventionError = null;
        break;
      case FETCH_PROBLEMS_SUCCESS:
        draft.fetchInterventionLoading = false;
        draft.interventions = action.payload.interventions;
        break;
      case FETCH_PROBLEMS_ERROR:
        draft.fetchInterventionLoading = false;
        draft.fetchInterventionError = action.payload.error;
        break;
      case CREATE_PROBLEM_SUCCESS:
      case COPY_PROBLEM_SUCCESS:
        draft.interventions = [
          ...state.interventions,
          action.payload.intervention,
        ];
        break;
      case ARCHIVE_PROBLEM_REQUEST:
        let interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex].status = archived;
        draft.cache.archiveIntervention =
          state.interventions[interventionIndex];
        break;
      case ARCHIVE_PROBLEM_SUCCESS:
        draft.cache.archiveIntervention = null;
        break;
      case ARCHIVE_PROBLEM_ERROR:
        interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex] =
          state.cache.archiveIntervention;
        draft.cache.archiveIntervention = null;
    }
  });

export default interventionsReducer;
