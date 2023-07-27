import produce from 'immer';

import {
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_QUESTION_GROUPS_REQUEST,
  FETCH_QUESTION_GROUPS_SUCCESS,
  FETCH_QUESTION_GROUPS_ERROR,
  CHANGE_VIEW,
  FETCH_INTERVENTIONS_WITH_PAGINATION_SUCCESS,
  FETCH_INTERVENTIONS_WITH_PAGINATION,
} from './constants';

export const initialState = {
  questionGroups: null,
  sessions: null,
  interventions: null,
  interventionCount: 0,
  loaders: {
    questionGroups: false,
    sessions: false,
    interventions: false,
  },
  errors: {
    questionGroups: false,
    sessions: false,
    interventions: false,
  },
  currentIds: {
    intervention: null,
    session: null,
  },
};

/* eslint-disable default-case, no-param-reassign */

export const copyModalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_SESSIONS_REQUEST:
        draft.loaders.sessions = true;
        draft.fetchSessionError = null;
        draft.sessions = null;
        draft.currentIds.intervention = action.payload.id;
        break;

      case FETCH_SESSIONS_SUCCESS:
        draft.loaders.sessions = false;
        draft.sessions = action.payload.sessions;
        break;

      case FETCH_SESSIONS_ERROR:
        draft.loaders.sessions = false;
        draft.fetchSessionError = action.payload.error;
        draft.sessions = null;
        break;

      case FETCH_QUESTION_GROUPS_REQUEST:
        draft.loaders.questionGroups = true;
        draft.fetchQuestionGroupsError = null;
        draft.questionGroups = null;
        draft.currentIds.session = action.payload.id;
        break;

      case FETCH_QUESTION_GROUPS_SUCCESS:
        draft.loaders.questionGroups = false;
        draft.questionGroups = action.payload.questionGroups;
        break;

      case FETCH_QUESTION_GROUPS_ERROR:
        draft.loaders.questionGroups = false;
        draft.fetchQuestionGroupsError = action.payload.error;
        draft.questionGroups = null;
        break;

      case CHANGE_VIEW:
        draft.loaders.questionGroups = true;
        break;

      case FETCH_INTERVENTIONS_WITH_PAGINATION:
        draft.loaders.interventions = true;
        break;

      case FETCH_INTERVENTIONS_WITH_PAGINATION_SUCCESS:
        const { interventions, interventionsSize, startIndex } = action.payload;
        draft.loaders.interventions = false;
        draft.interventions =
          startIndex === 0
            ? interventions
            : [...(state.interventions || []), ...interventions];
        draft.interventionCount = interventionsSize;
    }
  });

export default copyModalReducer;
