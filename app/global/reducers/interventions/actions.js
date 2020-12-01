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

export const fetchInterventionsRequest = () =>
  actionBuilder(FETCH_PROBLEMS_REQUEST, {});
export const fetchInterventionsSuccess = interventions =>
  actionBuilder(FETCH_PROBLEMS_SUCCESS, { interventions });
export const fetchInterventionsError = error =>
  actionBuilder(FETCH_PROBLEMS_ERROR, { error });

export const copyInterventionRequest = payload =>
  actionBuilder(COPY_PROBLEM_REQUEST, payload);
export const copyInterventionSuccess = intervention =>
  actionBuilder(COPY_PROBLEM_SUCCESS, { intervention });

export const archiveInterventionRequest = interventionId =>
  actionBuilder(ARCHIVE_PROBLEM_REQUEST, { interventionId });
export const archiveInterventionSuccess = interventionId =>
  actionBuilder(ARCHIVE_PROBLEM_SUCCESS, { interventionId });
export const archiveInterventionFailure = interventionId =>
  actionBuilder(ARCHIVE_PROBLEM_ERROR, { interventionId });
