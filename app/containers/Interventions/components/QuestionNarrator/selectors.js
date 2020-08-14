import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../containers/EditInterventionPage/selectors';

const makeSelectPreviewAnimation = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.previewAnimation,
  );
const makeSelectDraggable = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.draggable,
  );
const makeSelectAnimationPosition = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.animationPosition,
  );

const makeSelectPreviewData = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.previewData,
  );

export {
  makeSelectPreviewAnimation,
  makeSelectDraggable,
  makeSelectAnimationPosition,
  makeSelectPreviewData,
};
