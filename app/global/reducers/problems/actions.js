import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_ERROR,
  FETCH_PROBLEMS_SUCCESS,
  COPY_PROBLEM_REQUEST,
  COPY_PROBLEM_SUCCESS,
} from './constants';

export const fetchProblemsRequest = () =>
  actionBuilder(FETCH_PROBLEMS_REQUEST, {});
export const fetchProblemsSuccess = problems =>
  actionBuilder(FETCH_PROBLEMS_SUCCESS, { problems });
export const fetchProblemsError = error =>
  actionBuilder(FETCH_PROBLEMS_ERROR, { error });

export const copyProblemRequest = payload =>
  actionBuilder(COPY_PROBLEM_REQUEST, payload);
export const copyProblemSuccess = problem =>
  actionBuilder(COPY_PROBLEM_SUCCESS, { problem });
