import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_SUCCESS,
  COPY_INTERVENTION_REQUEST,
  COPY_INTERVENTION_SUCCESS,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
  ARCHIVE_INTERVENTION_ERROR,
} from './constants';

export const fetchInterventionsRequest = () =>
  actionBuilder(FETCH_INTERVENTIONS_REQUEST, {});
export const fetchInterventionsSuccess = (interventions) =>
  actionBuilder(FETCH_INTERVENTIONS_SUCCESS, { interventions });
export const fetchInterventionsError = (error) =>
  actionBuilder(FETCH_INTERVENTIONS_ERROR, { error });

export const copyInterventionRequest = (payload) =>
  actionBuilder(COPY_INTERVENTION_REQUEST, payload);
export const copyInterventionSuccess = (intervention) =>
  actionBuilder(COPY_INTERVENTION_SUCCESS, { intervention });

export const archiveInterventionRequest = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_REQUEST, { interventionId });
export const archiveInterventionSuccess = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_SUCCESS, { interventionId });
export const archiveInterventionFailure = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_ERROR, { interventionId });
