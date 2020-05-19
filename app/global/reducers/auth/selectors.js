import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

const makeSelectAuth = () =>
  createSelector(
    selectAuth,
    authState => authState,
  );

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.token,
  );

const makeSelectIsLoggedIn = () =>
  createSelector(
    selectAuth,
    authState => authState.isLoggedIn,
  );

export { makeSelectAuth, makeSelectToken, makeSelectIsLoggedIn };
