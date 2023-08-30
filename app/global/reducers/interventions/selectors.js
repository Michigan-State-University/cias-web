import { draft } from 'models/Status/StatusTypes';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventions = (state) => state.interventions || initialState;

export const makeSelectInterventionsState = () =>
  createSelector(interventions, (interventionsState) => interventionsState);

export const makeSelectInterventions = () =>
  createSelector(
    interventions,
    (interventionsState) => interventionsState.interventions,
  );

export const makeSelectPublishedInterventions = () =>
  createSelector(interventions, (interventionsState) =>
    interventionsState.interventions.filter(({ status }) => status === draft),
  );

export const makeSelectInterventionsLoader = (name) =>
  createSelector(interventions, ({ loaders }) => loaders[name]);

export const makeSelectInterventionsError = (name) =>
  createSelector(interventions, ({ errors }) => errors[name]);

export const makeSelectInterventionsStates = () =>
  createSelector(
    interventions,
    ({ interventionsStates }) => interventionsStates,
  );
