import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../containers/EditInterventionPage/selectors';

const makeSelectPreviewAnimation = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.previewAnimation,
  );

export { makeSelectPreviewAnimation };
