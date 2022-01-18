import produce from 'immer';
import sortBy from 'lodash/sortBy';

import { insertAt, removeAt } from 'utils/arrayUtils';
import { GroupType } from 'models/QuestionGroup';
import { ternary } from 'utils/ternary';
import {
  GET_QUESTION_GROUPS_SUCCESS,
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
  COPY_QUESTIONS_SUCCESS,
  COPY_QUESTIONS_ERROR,
  COPY_QUESTIONS_REQUEST,
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
    groups: null,
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
        draft.groups = payload.groups;
        draft.cache.groups = payload.groups;
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
        draft.groups = [...state.groups, payload.group];
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
        draft.cache.groups = state.groups;
        break;
      }
      case CHANGE_GROUP_NAME_ERROR: {
        draft.groups = state.cache.groups;
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
        draft.cache.groups = state.groups;
        break;

      case REORDER_GROUP_LIST_ERROR:
        draft.groups = state.cache.groups;
        break;

      case COPY_QUESTIONS_REQUEST:
        draft.loaders.questionGroupsLoading = true;
        break;
      case COPY_QUESTIONS_SUCCESS:
        const { group } = payload;
        if (group) {
          const groupsList = [...state.groups, group];
          draft.groups = groupsList;
          draft.cache.groups = groupsList;
        }
        draft.loaders.questionGroupsLoading = false;
        break;

      case COPY_QUESTIONS_ERROR:
        draft.loaders.questionGroupsLoading = false;
        draft.groups = state.cache.groups;
        break;
    }
  });

export { questionGroupsReducer };
