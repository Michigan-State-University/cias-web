import { createSelector } from 'reselect';

import { initialState } from './reducer';

const healthSystemsState = state => state.healthSystemsState || initialState;

export const makeSelectHealthSystemState = () =>
  createSelector(
    healthSystemsState,
    substate => substate,
  );
