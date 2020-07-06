import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../../containers/EditInterventionPage/selectors';

const makeSelectInterventionList = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.interventionList,
  );

export { makeSelectInterventionList };
