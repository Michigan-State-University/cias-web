import produce from 'immer';
import xor from 'lodash/xor';

import { insertAt, removeAt } from 'utils/arrayUtils';
import {
  GET_QUESTION_GROUPS_SUCCESS,
  CREATE_QUESTION_IN_GROUP,
  GROUP_QUESTIONS_SUCCESS,
  CHANGE_GROUP_NAME_REQUEST,
  SAVING_ACTIONS,
  SAVED_ACTIONS,
  CHANGE_GROUP_NAME_ERROR,
  CHANGE_GROUP_NAME_SUCCESS,
  REORDER_GROUP_LIST_REQUEST,
  REORDER_GROUP_LIST_SUCCESS,
  REORDER_GROUP_LIST_ERROR,
  CLEAN_GROUPS,
  GET_QUESTION_GROUPS_ERROR,
  GET_QUESTION_GROUPS_REQUEST,
} from './constants';

export const initialState = {
  groups: [],
  loaders: {
    questionGroupsLoading: false,
  },
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
      case GET_QUESTION_GROUPS_REQUEST: {
        draft.loaders.questionGroupsLoading = true;
        draft.groups = [];
        break;
      }
      case GET_QUESTION_GROUPS_SUCCESS: {
        draft.groups = payload.groups;
        draft.loaders.questionGroupsLoading = false;
        break;
      }
      case GET_QUESTION_GROUPS_ERROR: {
        draft.loaders.questionGroupsLoading = false;
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
        break;
      }
      case CLEAN_GROUPS: {
        const { questions } = payload;

        const currentGroups = state.groups.map(group => group.id);
        const afterReorderRemainingGroups = questions.map(
          question => question.question_group_id,
        );

        const toRemove = xor(currentGroups, afterReorderRemainingGroups);

        draft.groups = state.groups.filter(
          group => !toRemove.includes(group.id) || group.default,
        );

        break;
      }
      case REORDER_GROUP_LIST_REQUEST:
        draft.cache.groups = state.groups;
        const { groupId, destinationIndex, sourceIndex } = payload;

        const sourceGroup = {
          ...state.groups.find(group => group.id === groupId),
        };

        removeAt(draft.groups, sourceIndex);
        insertAt(draft.groups, destinationIndex, sourceGroup);

        draft.groups = draft.groups.map((group, index) => ({
          ...group,
          position: index + 1,
        }));

        break;
      case REORDER_GROUP_LIST_SUCCESS:
        draft.cache.groups = null;

        break;
      case REORDER_GROUP_LIST_ERROR:
        draft.groups = state.cache.groups;
        draft.cache.groups = null;

        break;
    }
  });

export { questionGroupsReducer };
