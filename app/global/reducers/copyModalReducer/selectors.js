import { createSelector } from 'reselect';
import { initialState } from './reducer';

const sessions = state => state.copyModal || initialState;

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

export const makeSelectQuestionGroups = () =>
  createSelector(
    sessions,
    substate => substate.questionGroups,
  );

export const makeSelectCopyModalLoader = () =>
  createSelector(
    sessions,
    substate => substate.loading,
  );
