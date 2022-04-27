import { actionBuilder } from 'utils/actionBuilder';

import {
  DUPLICATE_GROUPS_HERE_REQUEST,
  DUPLICATE_GROUPS_HERE_SUCCESS,
  DUPLICATE_GROUPS_HERE_ERROR,
  GROUP_QUESTIONS_REQUEST,
  GROUP_QUESTIONS_SUCCESS,
  GROUP_QUESTIONS_ERROR,
  SHARE_GROUPS_EXTERNALLY_REQUEST,
  SHARE_GROUPS_EXTERNALLY_SUCCESS,
  SHARE_GROUPS_EXTERNALLY_ERROR,
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_SUCCESS,
  CHANGE_GROUP_NAME_ERROR,
  GET_QUESTION_GROUPS_REQUEST,
  GET_QUESTION_GROUPS_SUCCESS,
  GET_QUESTION_GROUPS_ERROR,
  REORDER_GROUP_LIST_REQUEST,
  REORDER_GROUP_LIST_SUCCESS,
  REORDER_GROUP_LIST_ERROR,
  CLEAN_GROUPS,
  DUPLICATE_GROUPS_INTERNALLY_REQUEST,
} from './constants';

export const duplicateGroupsHereRequest = (questionIds, sessionId) =>
  actionBuilder(DUPLICATE_GROUPS_HERE_REQUEST, { questionIds, sessionId });
export const duplicateGroupsHereSuccess = (questions, groups) =>
  actionBuilder(DUPLICATE_GROUPS_HERE_SUCCESS, { questions, groups });
export const duplicateGroupsHereError = (error) =>
  actionBuilder(DUPLICATE_GROUPS_HERE_ERROR, { error });

export const duplicateGroupsInternallyRequest = (questionIds, sessionId) =>
  actionBuilder(DUPLICATE_GROUPS_INTERNALLY_REQUEST, {
    questionIds,
    sessionId,
  });

export const groupQuestionsRequest = (questionIds, sessionId) =>
  actionBuilder(GROUP_QUESTIONS_REQUEST, { questionIds, sessionId });
export const groupQuestionsSuccess = (group, questionIds) =>
  actionBuilder(GROUP_QUESTIONS_SUCCESS, { group, questionIds });
export const groupQuestionsError = (error) =>
  actionBuilder(GROUP_QUESTIONS_ERROR, { error });

export const shareGroupsExternallyRequest = (
  researcherIds,
  questionIds,
  sessionId,
) =>
  actionBuilder(SHARE_GROUPS_EXTERNALLY_REQUEST, {
    questionIds,
    researcherIds,
    sessionId,
  });
export const shareGroupsExternallySuccess = () =>
  actionBuilder(SHARE_GROUPS_EXTERNALLY_SUCCESS, {});
export const shareGroupsExternallyError = (error) =>
  actionBuilder(SHARE_GROUPS_EXTERNALLY_ERROR, { error });

export const changeGroupNameRequest = (title, sessionId, groupId) =>
  actionBuilder(CHANGE_GROUP_NAME_REQUEST, { title, sessionId, groupId });
export const changeGroupNameSuccess = () =>
  actionBuilder(CHANGE_GROUP_NAME_SUCCESS, {});
export const changeGroupNameError = (error) =>
  actionBuilder(CHANGE_GROUP_NAME_ERROR, { error });

export const getQuestionGroupsRequest = (sessionId, questionToSelectId) =>
  actionBuilder(GET_QUESTION_GROUPS_REQUEST, { sessionId, questionToSelectId });
export const getQuestionGroupsSuccess = (groups) =>
  actionBuilder(GET_QUESTION_GROUPS_SUCCESS, { groups });
export const getQuestionGroupsError = (error) =>
  actionBuilder(GET_QUESTION_GROUPS_ERROR, { error });

export const reorderGroupListRequest = (payload) =>
  actionBuilder(REORDER_GROUP_LIST_REQUEST, payload);
export const reorderGroupListSuccess = () =>
  actionBuilder(REORDER_GROUP_LIST_SUCCESS, {});
export const reorderGroupListError = (error) =>
  actionBuilder(REORDER_GROUP_LIST_ERROR, { error });

export const cleanGroups = (questions) =>
  actionBuilder(CLEAN_GROUPS, { questions });
