import { createSelector } from 'reselect';
import { initialState } from './reducer';

const interventions = state => state.interventions || initialState;

export const makeSelectInterventionsState = () =>
  createSelector(
    interventions,
    substate => substate,
  );

export const makeSelectInterventions = () =>
  createSelector(
    interventions,
    substate => substate.interventions,
  );

export const makeSelectInterventionsLoader = () =>
  createSelector(
    interventions,
    substate => substate.fetchInterventionLoading,
  );
