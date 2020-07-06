import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../../containers/EditInterventionPage/selectors';

export const makeSelectInterventionList = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.interventionList,
  );

export const makeSelectInterventionListLoader = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.loaders.interventionListLoading,
  );
