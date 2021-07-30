import { actionBuilder } from 'utils/actionBuilder';

import {
  CHANGE_CURRENT_NARRATOR_BLOCK,
  MAKE_CHARACTER_DRAGGABLE,
  SET_ANIMATION_STOP_POSITION,
  SET_QUESTION_SETTINGS,
  TOGGLE_QUESTION_SETTINGS,
  UPDATE_PREVIEW_ANIMATION,
  UPDATE_PREVIEW_DATA,
} from './constants';

export const changeCurrentNarratorBlock = (index) =>
  actionBuilder(CHANGE_CURRENT_NARRATOR_BLOCK, { index });

export const setCharacterDraggable = (draggable) =>
  actionBuilder(MAKE_CHARACTER_DRAGGABLE, { draggable });

export const setAnimationStopPosition = (posX, posY) =>
  actionBuilder(SET_ANIMATION_STOP_POSITION, { x: posX, y: posY });

export const setQuestionSettings = ({ index, questionIndex, tab }) =>
  actionBuilder(SET_QUESTION_SETTINGS, { index, questionIndex, tab });

export const toggleQuestionSettings = () =>
  actionBuilder(TOGGLE_QUESTION_SETTINGS, {});

export const updatePreviewAnimation = (animation) =>
  actionBuilder(UPDATE_PREVIEW_ANIMATION, { animation });

export const updatePreviewData = (data) =>
  actionBuilder(UPDATE_PREVIEW_DATA, { ...data });
