import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the global state domain
 */

const selectGlobalStateDomain = state => state.global || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GlobalState
 */

export const makeSelectGlobalState = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate,
  );

export const makeSelectAudioInstance = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.audioInstance,
  );
