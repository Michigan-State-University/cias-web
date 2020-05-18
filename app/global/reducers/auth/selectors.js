import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.token,
  );

export { makeSelectToken };
