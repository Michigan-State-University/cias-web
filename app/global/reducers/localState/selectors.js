import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectLocalState = state => state.localState || initialState;

export const makeSelectCurrentInterventionIndex = () =>
  createSelector(
    selectLocalState,
    substate => substate.currentInterventionIndex,
  );
