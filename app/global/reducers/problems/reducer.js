import produce from 'immer';

import {
  FETCH_PROBLEMS_ERROR,
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_SUCCESS,
} from './constants';

import { CREATE_PROBLEM_SUCCESS } from '../problem';

export const initialState = {
  problems: null,
  fetchProblemLoading: true,
  fetchProblemError: null,
};

/* eslint-disable default-case, no-param-reassign */
export const problemsRedcuer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROBLEMS_REQUEST:
        if (!draft.problems) draft.fetchProblemLoading = true;
        draft.fetchProblemError = null;
        break;
      case FETCH_PROBLEMS_SUCCESS:
        draft.fetchProblemLoading = false;
        draft.problems = action.payload.problems;
        break;
      case FETCH_PROBLEMS_ERROR:
        draft.fetchProblemLoading = false;
        draft.fetchProblemError = action.payload.error;
        break;
      case CREATE_PROBLEM_SUCCESS:
        draft.problems = [...draft.problems, action.payload.problem];
        break;
    }
  });

export default problemsRedcuer;
