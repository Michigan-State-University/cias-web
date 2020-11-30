import { createSelector } from 'reselect';
import { initialState } from './reducer';

const sessions = state => state.interventions || initialState;

export const makeSelectSessionsState = () =>
  createSelector(
    sessions,
    substate => substate,
  );

export const makeSelectSessions = () =>
  createSelector(
    sessions,
    substate => substate.interventions,
  );

export const makeSelectSessionsLoader = () =>
  createSelector(
    sessions,
    substate => substate.fetchInterventionLoading,
  );
