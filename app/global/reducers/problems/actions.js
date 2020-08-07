import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_ERROR,
  FETCH_PROBLEMS_SUCCESS,
} from './constants';

export const fetchProblemsRequest = () =>
  actionBuilder(FETCH_PROBLEMS_REQUEST, {});
export const fetchProblemsSuccess = problems =>
  actionBuilder(FETCH_PROBLEMS_SUCCESS, { problems });
export const fetchProblemsError = error =>
  actionBuilder(FETCH_PROBLEMS_ERROR, { error });
