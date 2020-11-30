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
  problems: [],
  fetchProblemLoading: true,
  fetchProblemError: null,
  cache: {
    archiveProblem: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const problemsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROBLEMS_REQUEST:
        if (isEmpty(state.problems)) draft.fetchProblemLoading = true;
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
      case COPY_PROBLEM_SUCCESS:
        draft.problems = [...state.problems, action.payload.problem];
        break;
      case ARCHIVE_PROBLEM_REQUEST:
        let problemIndex = draft.problems.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.problems[problemIndex].status = archived;
        draft.cache.archiveProblem = state.problems[problemIndex];
        break;
      case ARCHIVE_PROBLEM_SUCCESS:
        draft.cache.archiveProblem = null;
        break;
      case ARCHIVE_PROBLEM_ERROR:
        problemIndex = draft.problems.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.problems[problemIndex] = state.cache.archiveProblem;
        draft.cache.archiveProblem = null;
    }
  });

export default problemsReducer;
