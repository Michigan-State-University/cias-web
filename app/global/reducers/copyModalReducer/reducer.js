import produce from 'immer';

import {
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_QUESTION_GROUPS_REQUEST,
  FETCH_QUESTION_GROUPS_SUCCESS,
  FETCH_QUESTION_GROUPS_ERROR,
  CHANGE_VIEW,
} from './constants';

export const initialState = {
  questionGroups: [],
  sessions: null,
  fetchSessionLoading: true,
  fetchSessionError: null,
};

/* eslint-disable default-case, no-param-reassign */

export const copyModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SESSIONS_REQUEST:
        draft.loading = true;
        draft.fetchSessionError = null;
        draft.sessions = [];
        break;
      case FETCH_SESSIONS_SUCCESS:
        draft.loading = false;
        draft.sessions = action.payload.sessions;
        break;
      case FETCH_SESSIONS_ERROR:
        draft.loading = false;
        draft.fetchSessionError = action.payload.error;
        draft.sessions = [];
        break;
      case FETCH_QUESTION_GROUPS_REQUEST:
        draft.loading = true;
        draft.fetchQuestionGroupsError = null;
        draft.questionGroups = [];
        break;
      case FETCH_QUESTION_GROUPS_SUCCESS:
        draft.loading = false;
        draft.questionGroups = action.payload.questionGroups;
        break;
      case FETCH_QUESTION_GROUPS_ERROR:
        draft.loading = false;
        draft.fetchQuestionGroupsError = action.payload.error;
        draft.questionGroups = [];
        break;
      case CHANGE_VIEW:
        draft.loading = true;
        break;
    }
  });

export default copyModalReducer;
