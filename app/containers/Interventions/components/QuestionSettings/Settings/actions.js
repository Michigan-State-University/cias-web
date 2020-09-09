import { updateQuestionSettings } from 'global/reducers/questions';
import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  REMOVE_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_SPEECH_SETTINGS,
  UPDATE_NARRATOR_MOVEMENT,
  SWITCH_SPEECH_REFLECTION,
  UPDATE_REFLECTION,
  REORDER_NARRATOR_BLOCKS,
  UPDATE_PAUSE_DURATION,
} from './constants';

export const updateSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_QUESTION_SETTINGS,
    data: { property, value },
  });

export const updateNarratorSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_SETTINGS,
    data: { property, value },
  });

export const addBlock = (type, questionId) =>
  updateQuestionSettings({
    type: ADD_BLOCK,
    data: { type, questionId },
  });

export const removeBlock = (index, openedIndex) =>
  updateQuestionSettings({
    type: REMOVE_BLOCK,
    data: { index, openedIndex },
  });

export const updateNarratorAnimation = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_ANIMATION,
    data: { index, value, questionId },
  });

export const updateSpeechSettings = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_SPEECH_SETTINGS,
    data: { index, value, questionId },
  });

export const updateReflection = (
  blockIndex,
  reflectionIndex,
  value,
  questionId,
) =>
  updateQuestionSettings({
    type: UPDATE_REFLECTION,
    data: { blockIndex, reflectionIndex, value, questionId },
  });

export const switchSpeechReflection = (index, questionId) =>
  updateQuestionSettings({
    type: SWITCH_SPEECH_REFLECTION,
    data: { index, questionId },
  });

export const updateFormula = (value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_FORMULA,
    data: { value, questionId },
  });

export const addFormulaCase = questionId =>
  updateQuestionSettings({
    type: ADD_FORMULA_CASE,
    data: { questionId },
  });

export const removeFormulaCase = (index, questionId) =>
  updateQuestionSettings({
    type: REMOVE_FORMULA_CASE,
    data: { index, questionId },
  });

export const updateFormulaCase = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_FORMULA_CASE,
    data: { index, value, questionId },
  });

export const saveNarratorMovement = (index, questionId, position) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_MOVEMENT,
    data: { index, questionId, position },
  });

export const reorderNarratorBlocks = reorderedBlocks =>
  updateQuestionSettings({
    type: REORDER_NARRATOR_BLOCKS,
    data: { reorderedBlocks },
  });

export const updatePauseDuration = (index, duration) =>
  updateQuestionSettings({
    type: UPDATE_PAUSE_DURATION,
    data: { index, duration },
  });
