import { createSelector } from 'reselect';

import settingsTabsLabels from 'utils/settingsTabsLabels';

import { initialState } from './reducer';

export const selectLocalState = state => state.localState || initialState;

export const makeSelectCurrentNarratorBlockIndex = () =>
  createSelector(
    selectLocalState,
    substate => substate.currentNarratorBlockIndex,
  );

export const makeSelectQuestionSettingsVisibility = () =>
  createSelector(
    selectLocalState,
    substate => substate.questionSettings.visibility,
  );

export const makeSelectQuestionSettingsTab = () =>
  createSelector(
    selectLocalState,
    substate => substate.questionSettings.tab,
  );

export const makeSelectIsNarratorTab = () =>
  createSelector(
    selectLocalState,
    substate => substate.questionSettings.tab === settingsTabsLabels.narrator,
  );

export const makeSelectAnimationPosition = () =>
  createSelector(
    selectLocalState,
    substate => substate.animationPosition,
  );

export const makeSelectPreviewAnimation = () =>
  createSelector(
    selectLocalState,
    substate => substate.previewAnimation,
  );
export const makeSelectDraggable = () =>
  createSelector(
    selectLocalState,
    substate => substate.draggable,
  );

export const makeSelectPreviewData = () =>
  createSelector(
    selectLocalState,
    substate => substate.previewData,
  );
