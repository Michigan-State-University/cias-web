import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAuth = (state) => state.setNewPassword || initialState;

export const makeSelectError = () =>
  createSelector(selectAuth, (substate) => substate.setNewPasswordError);

export const makeSelectLoader = () =>
  createSelector(selectAuth, (substate) => substate.setNewPasswordLoading);
