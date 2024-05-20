import produce from 'immer';
import sortBy from 'lodash/sortBy';
import { merge, cloneDeep, sortedIndexBy } from 'lodash';

import { insertAt, removeAt } from 'utils/arrayUtils';
import { GroupType } from 'models/QuestionGroup';
import { ternary } from 'utils/ternary';
import { assignDraftItems } from 'utils/reduxUtils';
import {
  CHANGE_GROUP_NAME_ERROR,
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_SUCCESS,
  CLEAN_GROUPS,
  DUPLICATE_GROUPS_HERE_ERROR,
  DUPLICATE_GROUPS_HERE_REQUEST,
  DUPLICATE_GROUPS_HERE_SUCCESS,
  GET_QUESTION_GROUPS_ERROR,
  GET_QUESTION_GROUPS_REQUEST,
  GET_QUESTION_GROUPS_SUCCESS,
  GROUP_QUESTIONS_SUCCESS,
  REORDER_GROUP_LIST_ERROR,
  REORDER_GROUP_LIST_REQUEST,
  REORDER_GROUP_LIST_SUCCESS,
  SAVED_ACTIONS,
  SAVING_ACTIONS,
  UPDATE_QUESTION_GROUP_ERROR,
  UPDATE_QUESTION_GROUP_REQUEST,
  UPDATE_QUESTION_GROUP_SUCCESS,
} from './constants';

export const initialState = {
  sessionId: null,
  groups: [],
  loaders: {
    questionGroupsLoading: false,
  },
  errors: {
    questionGroupsError: null,
  },
  cache: {
    groups: [],
  },
  questionsGroupsSaving: false,
};

/* eslint-disable default-case, no-param-reassign */
const questionGroupsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    if (SAVING_ACTIONS.includes(type)) draft.questionsGroupsSaving = true;
    if (SAVED_ACTIONS.includes(type)) draft.questionsGroupsSaving = false;
    switch (type) {
      case GET_QUESTION_GROUPS_REQUEST: {
        draft.sessionId = payload.sessionId;
        draft.loaders.questionGroupsLoading = true;
        draft.errors.questionGroupsError = null;
        draft.groups = [];
        break;
      }
      case GET_QUESTION_GROUPS_SUCCESS: {
        draft.groups = payload.groups ?? [];
        assignDraftItems(draft.groups, draft.cache.groups);
        draft.loaders.questionGroupsLoading = false;
        draft.errors.questionGroupsError = null;
        break;
      }
      case GET_QUESTION_GROUPS_ERROR: {
        draft.sessionId = null;
        draft.loaders.questionGroupsLoading = false;
        draft.errors.questionGroupsError = payload.error;
        break;
      }
      case GROUP_QUESTIONS_SUCCESS: {
        const { group } = payload;
        const insertIndex = sortedIndexBy(state.groups, group, 'position');
        insertAt(draft.groups, insertIndex, group);
        assignDraftItems(draft.groups, draft.cache.groups);
        break;
      }
      case UPDATE_QUESTION_GROUP_REQUEST: {
        const index = state.groups.findIndex(
          ({ id }) => id === payload.groupId,
        );

        draft.groups[index] = merge(
          cloneDeep(state.groups[index]),
          payload.data,
        );
        break;
      }
      case UPDATE_QUESTION_GROUP_SUCCESS: {
        assignDraftItems(draft.groups, draft.cache.groups);
        break;
      }
      case UPDATE_QUESTION_GROUP_ERROR: {
        assignDraftItems(draft.cache.groups, draft.groups);
        break;
      }
      case CHANGE_GROUP_NAME_REQUEST: {
        const index = state.groups.findIndex(
          ({ id }) => id === payload.groupId,
        );
        draft.groups[index].title = payload.title;
        break;
      }
      case CHANGE_GROUP_NAME_SUCCESS: {
        assignDraftItems(draft.groups, draft.cache.groups);
        break;
      }
      case CHANGE_GROUP_NAME_ERROR: {
        assignDraftItems(draft.cache.groups, draft.groups);
        break;
      }
      case CLEAN_GROUPS: {
        const { questions } = payload;

        const afterReorderRemainingGroups = questions.map(
          (question) => question.question_group_id,
        );

        const filteredGroups = state.groups.filter((group) =>
          afterReorderRemainingGroups.includes(group.id),
        );

        draft.groups = sortBy(filteredGroups, 'position');
        assignDraftItems(draft.groups, draft.cache.groups);

        break;
      }
      case REORDER_GROUP_LIST_REQUEST:
        const { groupId, destinationIndex, sourceIndex } = payload;

        const sourceGroup = {
          ...state.groups.find((group) => group.id === groupId),
        };

        removeAt(state.groups, sourceIndex);
        insertAt(state.groups, destinationIndex, sourceGroup);

        draft.groups = state.groups.map((group, index) => ({
          ...group,
          position: ternary(
            group.type === GroupType.FINISH,
            group.position,
            index + 1,
          ),
        }));

        break;
      case REORDER_GROUP_LIST_SUCCESS:
        assignDraftItems(draft.groups, draft.cache.groups);
        break;

      case REORDER_GROUP_LIST_ERROR:
        assignDraftItems(draft.cache.groups, draft.groups);
        break;

      case DUPLICATE_GROUPS_HERE_REQUEST:
        draft.loaders.questionGroupsLoading = true;
        break;

      case DUPLICATE_GROUPS_HERE_SUCCESS:
        const { groups } = payload;
        draft.groups.push(...groups);
        assignDraftItems(draft.groups, draft.cache.groups);
        draft.loaders.questionGroupsLoading = false;
        break;

      case DUPLICATE_GROUPS_HERE_ERROR:
        draft.loaders.questionGroupsLoading = false;
        assignDraftItems(draft.cache.groups, draft.groups);
        break;
    }
  });

export { questionGroupsReducer };
