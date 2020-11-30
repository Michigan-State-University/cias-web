import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_ERROR,
  FETCH_PROBLEMS_SUCCESS,
  COPY_PROBLEM_REQUEST,
  COPY_PROBLEM_SUCCESS,
  ARCHIVE_PROBLEM_REQUEST,
  ARCHIVE_PROBLEM_SUCCESS,
  ARCHIVE_PROBLEM_ERROR,
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

export const archiveProblemRequest = problemId =>
  actionBuilder(ARCHIVE_PROBLEM_REQUEST, { problemId });
export const archiveProblemSuccess = problemId =>
  actionBuilder(ARCHIVE_PROBLEM_SUCCESS, { problemId });
export const archiveProblemFailure = problemId =>
  actionBuilder(ARCHIVE_PROBLEM_ERROR, { problemId });
