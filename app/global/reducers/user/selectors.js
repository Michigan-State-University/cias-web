import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the userList state domain
 */

const selectUserDomain = state => state.singleUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

export const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    ({ user }) => user,
  );

export const makeSelectUserLoader = name =>
  createSelector(
    selectUserDomain,
    ({ loaders }) => loaders[name],
  );

export const makeSelectUserError = name =>
  createSelector(
    selectUserDomain,
    ({ errors }) => errors[name],
  );
