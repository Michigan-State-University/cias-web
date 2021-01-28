import produce from 'immer';
import sortBy from 'lodash/sortBy';

import { insertAt, removeAt } from 'utils/arrayUtils';
import { FinishGroupType } from 'models/Session/GroupTypes';
import { ternary } from 'utils/ternary';
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
  sessionId: null,
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
        draft.sessionId = payload.sessionId;
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
        draft.sessionId = null;
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
        draft.groups = [...state.groups, payload.group];
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

        const afterReorderRemainingGroups = questions.map(
          question => question.question_group_id,
        );

        const filteredGroups = state.groups.filter(group =>
          afterReorderRemainingGroups.includes(group.id),
        );

        draft.groups = sortBy(filteredGroups, 'position');

        break;
      }
      case REORDER_GROUP_LIST_REQUEST:
        draft.cache.groups = state.groups;
        const { groupId, destinationIndex, sourceIndex } = payload;

        const sourceGroup = {
          ...state.groups.find(group => group.id === groupId),
        };

        removeAt(state.groups, sourceIndex);
        insertAt(state.groups, destinationIndex, sourceGroup);

        draft.groups = state.groups.map((group, index) => ({
          ...group,
          position: ternary(
            group.type === FinishGroupType,
            group.position,
            index + 1,
          ),
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
