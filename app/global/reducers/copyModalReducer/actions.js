import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_SUCCESS,
  FETCH_QUESTION_GROUPS_REQUEST,
  FETCH_QUESTION_GROUPS_SUCCESS,
  FETCH_QUESTION_GROUPS_ERROR,
  CHANGE_VIEW,
  FETCH_INTERVENTIONS_WITH_PAGINATION,
  FETCH_INTERVENTIONS_WITH_PAGINATION_SUCCESS,
} from './constants';

export const fetchInterventionsWithPaginationRequest = (
  paginationData,
  filterData,
) =>
  actionBuilder(FETCH_INTERVENTIONS_WITH_PAGINATION, {
    paginationData,
    filterData,
  });

export const fetchInterventionsWithPaginationSuccess = (
  interventions,
  interventionsSize,
  startIndex,
) =>
  actionBuilder(FETCH_INTERVENTIONS_WITH_PAGINATION_SUCCESS, {
    interventions,
    interventionsSize,
    startIndex,
  });

export const fetchSessionsRequest = (id, withoutMultiple) =>
  actionBuilder(FETCH_SESSIONS_REQUEST, { id, withoutMultiple });
export const fetchSessionsSuccess = (sessions) =>
  actionBuilder(FETCH_SESSIONS_SUCCESS, { sessions });
export const fetchSessionsError = (error) =>
  actionBuilder(FETCH_SESSIONS_ERROR, { error });

export const fetchQuestionGroupsRequest = (id) =>
  actionBuilder(FETCH_QUESTION_GROUPS_REQUEST, { id });
export const fetchQuestionGroupsSuccess = (questionGroups) =>
  actionBuilder(FETCH_QUESTION_GROUPS_SUCCESS, { questionGroups });
export const fetchQuestionGroupsError = (error) =>
  actionBuilder(FETCH_QUESTION_GROUPS_ERROR, { error });

export const changeViewAction = () => actionBuilder(CHANGE_VIEW, {});
