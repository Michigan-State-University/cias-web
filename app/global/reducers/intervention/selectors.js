import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectIntervention = state => state.intervention || initialState;

const makeSelectIntervention = () =>
  createSelector(
    selectIntervention,
    substate => substate.intervention,
  );

const makeSelectInterventionLoaders = () =>
  createSelector(
    selectIntervention,
    substate => substate.loaders,
  );

export { makeSelectIntervention, makeSelectInterventionLoaders };
