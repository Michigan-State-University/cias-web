import produce from 'immer';

import {
  GET_QUESTION_GROUPS_SUCCESS,
  CREATE_QUESTION_IN_GROUP,
  GROUP_QUESTIONS_SUCCESS,
  CHANGE_GROUP_NAME_REQUEST,
  SAVING_ACTIONS,
  SAVED_ACTIONS,
  CHANGE_GROUP_NAME_ERROR,
  CHANGE_GROUP_NAME_SUCCESS,
} from './constants';

export const initialState = {
  groups: [],
  loaders: {},
  cache: {
    groups: null,
  },
  questionsGroupsSaving: false,
};

/* eslint-disable default-case, no-param-reassign */
const questionGroupsReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    if (SAVING_ACTIONS.includes(type)) draft.questionsGroupsSaving = true;
    if (SAVED_ACTIONS.includes(type)) draft.questionsGroupsSaving = false;
    switch (type) {
      case GET_QUESTION_GROUPS_SUCCESS: {
        draft.groups = payload.groups;
        break;
      }
      case CREATE_QUESTION_IN_GROUP: {
        const index = state.groups.findIndex(
          ({ id }) => id === payload.groupId,
        );
        draft.groups[index].questions = true;
        break;
      }
      case GROUP_QUESTIONS_SUCCESS: {
        draft.groups = [...draft.groups, payload.group];
        break;
      }
      case CHANGE_GROUP_NAME_REQUEST: {
        draft.cache.groups = state.groups;
        const index = state.groups.findIndex(
          ({ id }) => id === payload.groupId,
        );
        draft.groups[index].title = payload.title;
        break;
      }
      case CHANGE_GROUP_NAME_SUCCESS: {
        draft.cache.groups = null;
        break;
      }
      case CHANGE_GROUP_NAME_ERROR: {
        draft.groups = state.cache.groups;
      }
    }
  });

export { questionGroupsReducer };
