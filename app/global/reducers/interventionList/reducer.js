import produce from 'immer';

import {
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
} from './constants';

export const initialState = {
  interventions: [],
  fetchInterventionLoading: false,
  fetchInterventionError: null,
};

/* eslint-disable default-case, no-param-reassign */
export const interventionListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INTERVENTIONS_REQUEST:
        draft.fetchInterventionLoading = true;
        draft.fetchInterventionError = null;
        draft.interventions = [];
        break;
      case FETCH_INTERVENTIONS_SUCCESS:
        draft.fetchInterventionLoading = false;
        draft.interventions = action.payload.interventions;
        break;
      case FETCH_INTERVENTIONS_ERROR:
        draft.fetchInterventionLoading = false;
        draft.fetchInterventionError = action.payload.error;
        break;
    }
  });

export default interventionListReducer;
