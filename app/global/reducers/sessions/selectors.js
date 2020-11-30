import { createSelector } from 'reselect';
import { initialState } from './reducer';

const sessions = state => state.sessions || initialState;

export const makeSelectSessionsState = () =>
  createSelector(
    sessions,
    substate => substate,
  );

export const makeSelectSessions = () =>
  createSelector(
    sessions,
    substate => substate.sessions,
  );

export const makeSelectSessionsLoader = () =>
  createSelector(
    sessions,
    substate => substate.fetchSessionLoading,
  );
