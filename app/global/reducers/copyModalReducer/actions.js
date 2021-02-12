import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_SUCCESS,
  FETCH_QUESTION_GROUPS_REQUEST,
  FETCH_QUESTION_GROUPS_SUCCESS,
  FETCH_QUESTION_GROUPS_ERROR,
  CHANGE_VIEW,
} from './constants';

export const fetchSessionsRequest = id =>
  actionBuilder(FETCH_SESSIONS_REQUEST, { id });
export const fetchSessionsSuccess = sessions =>
  actionBuilder(FETCH_SESSIONS_SUCCESS, { sessions });
export const fetchSessionsError = error =>
  actionBuilder(FETCH_SESSIONS_ERROR, { error });

export const fetchQuestionGroupsRequest = id =>
  actionBuilder(FETCH_QUESTION_GROUPS_REQUEST, { id });
export const fetchQuestionGroupsSuccess = questionGroups =>
  actionBuilder(FETCH_QUESTION_GROUPS_SUCCESS, { questionGroups });
export const fetchQuestionGroupsError = error =>
  actionBuilder(FETCH_QUESTION_GROUPS_ERROR, { error });

export const changeViewAction = () => actionBuilder(CHANGE_VIEW, {});
