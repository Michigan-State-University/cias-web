import { actionBuilder } from 'utils/actionBuilder';

import {
  COPY_QUESTIONS_REQUEST,
  COPY_QUESTIONS_SUCCESS,
  COPY_QUESTIONS_ERROR,
  DELETE_QUESTIONS_REQUEST,
  DELETE_QUESTIONS_SUCCESS,
  DELETE_QUESTIONS_ERROR,
  GROUP_QUESTIONS_REQUEST,
  GROUP_QUESTIONS_SUCCESS,
  GROUP_QUESTIONS_ERROR,
  SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST,
  SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS,
  SHARE_QUESTIONS_TO_RESEARCHERS_ERROR,
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_SUCCESS,
  CHANGE_GROUP_NAME_ERROR,
  GET_QUESTION_GROUPS_REQUEST,
  GET_QUESTION_GROUPS_SUCCESS,
  GET_QUESTION_GROUPS_ERROR,
  CREATE_QUESTION_IN_GROUP,
  REORDER_GROUP_LIST_REQUEST,
  REORDER_GROUP_LIST_SUCCESS,
  REORDER_GROUP_LIST_ERROR,
  CLEAN_GROUPS,
} from './constants';

export const copyQuestionsRequest = questionIds =>
  actionBuilder(COPY_QUESTIONS_REQUEST, { questionIds });
export const copyQuestionsSuccess = questions =>
  actionBuilder(COPY_QUESTIONS_SUCCESS, { questions });
export const copyQuestionsError = error =>
  actionBuilder(COPY_QUESTIONS_ERROR, { error });

export const deleteQuestionsRequest = questionIds =>
  actionBuilder(DELETE_QUESTIONS_REQUEST, { questionIds });
export const deleteQuestionsSuccess = () =>
  actionBuilder(DELETE_QUESTIONS_SUCCESS, {});
export const deleteQuestionsError = error =>
  actionBuilder(DELETE_QUESTIONS_ERROR, { error });

export const groupQuestionsRequest = (questionIds, sessionId) =>
  actionBuilder(GROUP_QUESTIONS_REQUEST, { questionIds, sessionId });
export const groupQuestionsSuccess = (group, questionIds) =>
  actionBuilder(GROUP_QUESTIONS_SUCCESS, { group, questionIds });
export const groupQuestionsError = error =>
  actionBuilder(GROUP_QUESTIONS_ERROR, { error });

export const shareQuestionsToResearchersRequest = (
  researcherIds,
  questionIds,
) =>
  actionBuilder(SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST, {
    questionIds,
    researcherIds,
  });
export const shareQuestionsToResearchersSuccess = () =>
  actionBuilder(SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS, {});
export const shareQuestionsToResearchersError = error =>
  actionBuilder(SHARE_QUESTIONS_TO_RESEARCHERS_ERROR, { error });

export const changeGroupNameRequest = (title, sessionId, groupId) =>
  actionBuilder(CHANGE_GROUP_NAME_REQUEST, { title, sessionId, groupId });
export const changeGroupNameSuccess = () =>
  actionBuilder(CHANGE_GROUP_NAME_SUCCESS, {});
export const changeGroupNameError = error =>
  actionBuilder(CHANGE_GROUP_NAME_ERROR, { error });

export const getQuestionGroupsRequest = sessionId =>
  actionBuilder(GET_QUESTION_GROUPS_REQUEST, { sessionId });
export const getQuestionGroupsSuccess = groups =>
  actionBuilder(GET_QUESTION_GROUPS_SUCCESS, { groups });
export const getQuestionGroupsError = error =>
  actionBuilder(GET_QUESTION_GROUPS_ERROR, { error });

export const createNewQuestionInGroup = (question, groupId) =>
  actionBuilder(CREATE_QUESTION_IN_GROUP, { question, groupId });

export const reorderGroupListRequest = payload =>
  actionBuilder(REORDER_GROUP_LIST_REQUEST, payload);
export const reorderGroupListSuccess = () =>
  actionBuilder(REORDER_GROUP_LIST_SUCCESS, {});
export const reorderGroupListError = error =>
  actionBuilder(REORDER_GROUP_LIST_ERROR, { error });

export const cleanGroups = questions =>
  actionBuilder(CLEAN_GROUPS, { questions });
