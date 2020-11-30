import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSession = state => state.intervention || initialState;

const makeSelectSession = () =>
  createSelector(
    selectSession,
    substate => substate.intervention,
  );

const makeSelectCacheSession = () =>
  createSelector(
    selectSession,
    substate => substate.cache.intervention,
  );

const makeSelectSessionLoaders = () =>
  createSelector(
    selectSession,
    substate => substate.loaders,
  );

const makeSelectSessionEditLoader = () =>
  createSelector(
    selectSession,
    substate => substate.interventionSaving,
  );

export {
  makeSelectSession,
  makeSelectCacheSession,
  makeSelectSessionLoaders,
  makeSelectSessionEditLoader,
};
