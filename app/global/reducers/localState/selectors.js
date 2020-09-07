import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectLocalState = state => state.localState || initialState;

export const makeSelectCurrentNarratorBlockIndex = () =>
  createSelector(
    selectLocalState,
    substate => substate.currentNarratorBlockIndex,
  );
