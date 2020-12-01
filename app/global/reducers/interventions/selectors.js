import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventions = state => state.interventions || initialState;

export const makeSelectInterventionsState = () =>
  createSelector(
    interventions,
    interventionsState => interventionsState,
  );

export const makeSelectInterventions = () =>
  createSelector(
    interventions,
    interventionsState => interventionsState.interventions,
  );

export const makeSelectInterventionsLoader = () =>
  createSelector(
    interventions,
    interventionsState => interventionsState.fetchInterventionLoading,
  );
