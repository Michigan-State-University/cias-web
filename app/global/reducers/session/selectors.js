import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSession = (state) => state.session || initialState;

export const makeSelectSession = () =>
  createSelector(selectSession, (substate) => substate.session);

export const makeSelectCurrentSessionId = () =>
  createSelector(selectSession, (substate) => substate.session?.id);

export const makeSelectCacheSession = () =>
  createSelector(selectSession, (substate) => substate.cache.session);

export const makeSelectSessionLoader = (name) =>
  createSelector(selectSession, ({ loaders }) => loaders[name]);

export const makeSelectSessionEditLoader = () =>
  createSelector(selectSession, (substate) => substate.sessionSaving);

export const makeSelectSessionError = (name) =>
  createSelector(selectSession, ({ errors }) => errors[name]);

export const makeSelectSessionLanguageCode = () =>
  createSelector(selectSession, (substate) => substate.session?.languageCode);
