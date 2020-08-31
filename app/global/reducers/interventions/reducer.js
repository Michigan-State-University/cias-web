import produce from 'immer';

import {
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
} from './constants';

export const initialState = {
  interventions: null,
  fetchInterventionLoading: true,
  fetchInterventionError: null,
};

/* eslint-disable default-case, no-param-reassign */

export const interventionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INTERVENTIONS_REQUEST:
        if (!draft.interventions) draft.fetchInterventionLoading = true;
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
    }
  });

export default interventionsReducer;