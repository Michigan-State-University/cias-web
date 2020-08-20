import produce from 'immer';
import set from 'lodash/set';

import {
  FETCH_PROBLEM_REQUEST,
  FETCH_PROBLEM_SUCCESS,
  FETCH_PROBLEM_ERROR,
  CREATE_PROBLEM_REQUEST,
  CREATE_PROBLEM_SUCCESS,
  CREATE_PROBLEM_ERROR,
  EDIT_PROBLEM_REQUEST,
  EDIT_PROBLEM_SUCCESS,
  EDIT_PROBLEM_ERROR,
  SEND_PROBLEM_CSV_REQUEST,
  SEND_PROBLEM_CSV_SUCCESS,
  SEND_PROBLEM_CSV_ERROR,
  REORDER_INTERVENTION_LIST,
} from './constants';

export const initialState = {
  problem: null,
  cache: {
    problem: null,
  },
  loaders: {
    fetchProblemLoading: true,
    createProblemLoading: false,
    sendCsvLoading: false,
  },
  errors: {
    fetchProblemError: null,
    createProblemError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const problemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROBLEM_REQUEST:
        if (state.problem && action.payload.id === state.problem.id) break;
        draft.loaders.fetchProblemLoading = true;
        draft.loaders.fetchProblemError = null;
        draft.problem = null;
        break;
      case FETCH_PROBLEM_SUCCESS:
        draft.loaders.fetchProblemLoading = false;
        draft.problem = action.payload.problem;
        draft.cache.problem = action.payload.problem;
        break;
      case FETCH_PROBLEM_ERROR:
        draft.loaders.fetchProblemLoading = false;
        draft.errors.fetchProblemError = action.payload.error;
        break;
      case CREATE_PROBLEM_REQUEST:
        draft.loaders.createProblemLoading = true;
        draft.loaders.createProblemError = null;
        break;
      case CREATE_PROBLEM_SUCCESS:
        draft.loaders.createProblemLoading = false;
        break;
      case CREATE_PROBLEM_ERROR:
        break;
      case EDIT_PROBLEM_REQUEST:
        set(draft.problem, action.payload.path, action.payload.value);
        break;
      case EDIT_PROBLEM_SUCCESS:
        draft.problem = action.payload.problem;
        draft.cache.problem = action.payload.problem;
        break;
      case EDIT_PROBLEM_ERROR:
        draft.problem = draft.cache.problem;
        break;
      case SEND_PROBLEM_CSV_REQUEST:
        draft.loaders.sendCsvLoading = true;
        break;
      case SEND_PROBLEM_CSV_SUCCESS:
        draft.loaders.sendCsvLoading = false;
        break;
      case SEND_PROBLEM_CSV_ERROR:
        draft.loaders.sendCsvLoading = false;
        break;
      case REORDER_INTERVENTION_LIST:
        draft.problem.interventions = action.payload.reorderedList;
        break;
    }
  });

export default problemReducer;
