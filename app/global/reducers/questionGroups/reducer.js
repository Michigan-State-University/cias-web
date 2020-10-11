import produce from 'immer';

import {
  GET_QUESTION_GROUPS_SUCCESS,
  CREATE_QUESTION_IN_GROUP,
  CHANGE_GROUP_NAME_SUCCESS,
  GROUP_QUESTIONS_SUCCESS,
} from './constants';

export const initialState = {
  groups: [],
};

/* eslint-disable default-case, no-param-reassign */
const questionGroupsReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
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
      case CHANGE_GROUP_NAME_SUCCESS: {
        const index = state.groups.findIndex(
          ({ id }) => id === payload.groupId,
        );
        draft.groups[index].title = payload.title;
        break;
      }
      case GROUP_QUESTIONS_SUCCESS: {
        const stateGroups = state.groups;
        const stateGroupsLength = stateGroups.length;
        draft.groups = [
          ...draft.groups.slice(0, stateGroupsLength - 1),
          payload.group,
          ...draft.groups.slice(-1),
        ];
        break;
      }
    }
  });

export { questionGroupsReducer };
