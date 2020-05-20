import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateInterventionPageDomain = state =>
  state.createInterventionPage || initialState;

const makeSelectCreateInterventionPage = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate,
  );

const makeSelectIntervention = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.intervention,
  );

export {
  makeSelectCreateInterventionPage,
  selectCreateInterventionPageDomain,
  makeSelectIntervention,
};
