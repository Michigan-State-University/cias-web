import produce from 'immer';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import settingsTabLabels from 'utils/settingsTabsLabels';
import { bodyAnimationType } from 'models/Narrator/BlockTypes';
import { elements } from 'theme';

import {
  CHANGE_CURRENT_NARRATOR_BLOCK,
  UPDATE_PREVIEW_DATA,
  UPDATE_PREVIEW_ANIMATION,
  TOGGLE_QUESTION_SETTINGS,
  MAKE_CHARACTER_DRAGGABLE,
  SET_ANIMATION_STOP_POSITION,
  SET_QUESTION_SETTINGS,
} from './constants';
import { getPreviewData } from './utils';

export const initialState = {
  currentNarratorBlockIndex: -1,
  questionSettings: {
    visibility: true,
    tab: settingsTabLabels.settings,
  },
  animationPosition: elements.characterInitialPosition,
  draggable: false,
  previewData: {
    animation: 'standStill',
    type: bodyAnimationType,
  },
};

/* eslint-disable default-case, no-param-reassign */
const localStateReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case CHANGE_CURRENT_NARRATOR_BLOCK:
        draft.currentNarratorBlockIndex = payload.index;
        break;
      case MAKE_CHARACTER_DRAGGABLE:
        draft.draggable = payload.draggable;
        break;
      case SET_ANIMATION_STOP_POSITION:
        draft.animationPosition = payload;
        break;
      case TOGGLE_QUESTION_SETTINGS:
        const { visibility } = state.questionSettings;
        draft.questionSettings.visibility = !visibility;
        break;
      case SET_QUESTION_SETTINGS:
        if (!isNullOrUndefined(payload.index)) {
          draft.questionSettings.tab = settingsTabLabels.settings;
        }
        if (!isNullOrUndefined(payload.tab))
          draft.questionSettings.tab = payload.tab;
        break;
      case UPDATE_PREVIEW_ANIMATION:
      case UPDATE_PREVIEW_DATA:
        draft.previewData = getPreviewData(payload);
        break;
    }
  });

export { localStateReducer };
