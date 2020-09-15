import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAuth = state => state.resetPassword || initialState;

export const makeSelectError = () =>
  createSelector(
    selectAuth,
    substate => substate.resetPasswordError,
  );

export const makeSelectLoader = () =>
  createSelector(
    selectAuth,
    substate => substate.resetPasswordLoading,
  );
