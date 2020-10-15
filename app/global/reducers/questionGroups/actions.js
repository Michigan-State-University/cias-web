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

export const groupQuestionsRequest = (questionIds, interventionId) =>
  actionBuilder(GROUP_QUESTIONS_REQUEST, { questionIds, interventionId });
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

export const changeGroupNameRequest = (title, interventionId, groupId) =>
  actionBuilder(CHANGE_GROUP_NAME_REQUEST, { title, interventionId, groupId });
export const changeGroupNameSuccess = () =>
  actionBuilder(CHANGE_GROUP_NAME_SUCCESS, {});
export const changeGroupNameError = error =>
  actionBuilder(CHANGE_GROUP_NAME_ERROR, { error });

export const getQuestionGroupsRequest = interventionId =>
  actionBuilder(GET_QUESTION_GROUPS_REQUEST, { interventionId });
export const getQuestionGroupsSuccess = groups =>
  actionBuilder(GET_QUESTION_GROUPS_SUCCESS, { groups });
export const getQuestionGroupsError = error =>
  actionBuilder(GET_QUESTION_GROUPS_ERROR, { error });

export const createNewQuestionInGroup = (question, groupId) =>
  actionBuilder(CREATE_QUESTION_IN_GROUP, { question, groupId });
