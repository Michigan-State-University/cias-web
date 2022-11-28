import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_SUCCESS,
  COPY_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
  ARCHIVE_INTERVENTION_ERROR,
  IMPORT_INTERVENTION_REQUEST,
  IMPORT_INTERVENTION_SUCCESS,
  IMPORT_INTERVENTION_ERROR,
  REFETCH_INTERVENTIONS,
} from './constants';

export const fetchInterventionsRequest = ({
  paginationData,
  filterData,
} = {}) =>
  actionBuilder(FETCH_INTERVENTIONS_REQUEST, { paginationData, filterData });
export const fetchInterventionsSuccess = (
  interventions,
  { paginationData, interventionsSize } = {},
) =>
  actionBuilder(FETCH_INTERVENTIONS_SUCCESS, {
    interventions,
    paginationData,
    interventionsSize: interventionsSize ?? Number.MAX_SAFE_INTEGER,
  });
export const fetchInterventionsError = (error) =>
  actionBuilder(FETCH_INTERVENTIONS_ERROR, { error });

export const copyInterventionRequest = (payload) =>
  actionBuilder(COPY_INTERVENTION_REQUEST, payload);

export const archiveInterventionRequest = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_REQUEST, { interventionId });
export const archiveInterventionSuccess = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_SUCCESS, { interventionId });
export const archiveInterventionFailure = (interventionId) =>
  actionBuilder(ARCHIVE_INTERVENTION_ERROR, { interventionId });

export const importInterventionRequest = (file, extraOptions) =>
  actionBuilder(IMPORT_INTERVENTION_REQUEST, { file, extraOptions });
export const importInterventionSuccess = () =>
  actionBuilder(IMPORT_INTERVENTION_SUCCESS, {});
export const importInterventionError = (error) =>
  actionBuilder(IMPORT_INTERVENTION_ERROR, { error });

export const refetchInterventions = () =>
  actionBuilder(REFETCH_INTERVENTIONS, {});
