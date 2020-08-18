import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_PROBLEM_REQUEST,
  FETCH_PROBLEM_SUCCESS,
  FETCH_PROBLEM_ERROR,
  CREATE_PROBLEM_REQUEST,
  CREATE_PROBLEM_SUCCESS,
  CREATE_PROBLEM_ERROR,
  EDIT_PROBLEM_REQUEST,
  EDIT_PROBLEM_SUCCESS,
  EDIT_PROBLEM_ERROR,
  SEND_PROBLEM_CSV_REQUEST,
  SEND_PROBLEM_CSV_SUCCESS,
  SEND_PROBLEM_CSV_ERROR,
  REORDER_INTERVENTION_LIST,
} from './constants';

export const fetchProblemRequest = id =>
  actionBuilder(FETCH_PROBLEM_REQUEST, { id });
export const fetchProblemSuccess = problem =>
  actionBuilder(FETCH_PROBLEM_SUCCESS, { problem });
export const fetchProblemError = error =>
  actionBuilder(FETCH_PROBLEM_ERROR, { error });

export const sendProblemCsvRequest = id =>
  actionBuilder(SEND_PROBLEM_CSV_REQUEST, { id });
export const sendProblemCsvSuccess = message =>
  actionBuilder(SEND_PROBLEM_CSV_SUCCESS, { message });
export const sendProblemCsvError = error =>
  actionBuilder(SEND_PROBLEM_CSV_ERROR, { error });

export const createProblemRequest = () =>
  actionBuilder(CREATE_PROBLEM_REQUEST, {});
export const createProblemSuccess = problem =>
  actionBuilder(CREATE_PROBLEM_SUCCESS, { problem });
export const createProblemError = error =>
  actionBuilder(CREATE_PROBLEM_ERROR, { error });

export const editProblemRequest = payload =>
  actionBuilder(EDIT_PROBLEM_REQUEST, payload);
export const editProblemSuccess = problem =>
  actionBuilder(EDIT_PROBLEM_SUCCESS, { problem });
export const editProblemError = () => actionBuilder(EDIT_PROBLEM_ERROR, {});

export const reorderInterventionList = payload =>
  actionBuilder(REORDER_INTERVENTION_LIST, payload);
