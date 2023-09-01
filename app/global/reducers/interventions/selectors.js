import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventions = (state) => state.interventions || initialState;

export const makeSelectInterventionsReducerState = () =>
  createSelector(interventions, (interventionsState) => interventionsState);

export const makeSelectInterventionsLoader = (name) =>
  createSelector(interventions, ({ loaders }) => loaders[name]);

export const makeSelectInterventionsError = (name) =>
  createSelector(interventions, ({ errors }) => errors[name]);
