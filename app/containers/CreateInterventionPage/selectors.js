import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createInterventionPage state domain
 */

const selectCreateInterventionPageDomain = state =>
  state.createInterventionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateInterventionPage
 */

const makeSelectCreateInterventionPage = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate,
  );

export default makeSelectCreateInterventionPage;
export { selectCreateInterventionPageDomain };
