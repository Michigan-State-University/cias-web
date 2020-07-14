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

export {
  makeSelectPreviewAnimation,
  makeSelectDraggable,
  makeSelectAnimationPosition,
};
