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
  UPDATE_BLOCK_SETTINGS,
  UPDATE_NARRATOR_MOVEMENT,
  SWITCH_SPEECH_REFLECTION,
  UPDATE_REFLECTION,
  REORDER_NARRATOR_BLOCKS,
  UPDATE_PAUSE_DURATION,
  UPDATE_REFLECTION_FORMULA,
  ADD_FORMULA_TARGET,
  UPDATE_FORMULA_TARGET,
  REMOVE_FORMULA_TARGET,
  ADD_NEW_FORMULA,
  REMOVE_FORMULA,
  DUPLICATE_FORMULA,
  UPDATE_ENTIRE_NARRATOR,
} from './constants';

export const updateSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_QUESTION_SETTINGS,
    data: { property, value },
  });

export const updateEntireNarrator = (newNarrator) =>
  updateQuestionSettings({
    type: UPDATE_ENTIRE_NARRATOR,
    data: { newNarrator },
  });

export const updateNarratorSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_SETTINGS,
    data: { property, value },
  });

export const addBlock = (type, questionId, groupIds) =>
  updateQuestionSettings({
    type: ADD_BLOCK,
    data: { type, questionId, groupIds },
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

export const updateBlockSettings = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_BLOCK_SETTINGS,
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

export const switchSpeechReflection = (index, questionId, switchTo) =>
  updateQuestionSettings({
    type: SWITCH_SPEECH_REFLECTION,
    data: { index, questionId, switchTo },
  });

export const updateReflectionFormulaBlock = (index, questionId, data) =>
  updateQuestionSettings({
    type: UPDATE_REFLECTION_FORMULA,
    data: { ...data, questionId, index },
  });

export const updateFormula = (value, questionId, formulaIndex) =>
  updateQuestionSettings({
    type: UPDATE_FORMULA,
    data: { value, questionId, formulaIndex },
  });

export const addFormulaCase = (questionId, formulaIndex) =>
  updateQuestionSettings({
    type: ADD_FORMULA_CASE,
    data: { questionId, formulaIndex },
  });

export const removeFormulaCase = (index, questionId, formulaIndex) =>
  updateQuestionSettings({
    type: REMOVE_FORMULA_CASE,
    data: { index, questionId, formulaIndex },
  });

export const updateFormulaCase = (index, value, questionId, formulaIndex) =>
  updateQuestionSettings({
    type: UPDATE_FORMULA_CASE,
    data: { index, value, questionId, formulaIndex },
  });

export const saveNarratorMovement = (index, questionId, position) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_MOVEMENT,
    data: { index, questionId, position },
  });

export const reorderNarratorBlocks = (reorderedBlocks) =>
  updateQuestionSettings({
    type: REORDER_NARRATOR_BLOCKS,
    data: { reorderedBlocks },
  });

export const updatePauseDuration = (index, duration) =>
  updateQuestionSettings({
    type: UPDATE_PAUSE_DURATION,
    data: { index, duration },
  });

export const addFormulaTarget = (questionId, patternIndex, formulaIndex) =>
  updateQuestionSettings({
    type: ADD_FORMULA_TARGET,
    data: { questionId, patternIndex, formulaIndex },
  });

export const updateFormulaTarget = (
  questionId,
  patternIndex,
  targetIndex,
  targetData,
  formulaIndex,
) =>
  updateQuestionSettings({
    type: UPDATE_FORMULA_TARGET,
    data: { questionId, patternIndex, targetIndex, targetData, formulaIndex },
  });

export const removeFormulaTarget = (
  questionId,
  patternIndex,
  targetIndex,
  formulaIndex,
) =>
  updateQuestionSettings({
    type: REMOVE_FORMULA_TARGET,
    data: { questionId, patternIndex, targetIndex, formulaIndex },
  });

export const addNewFormula = (questionId) =>
  updateQuestionSettings({
    type: ADD_NEW_FORMULA,
    data: { questionId },
  });

export const removeFormula = (questionId, formulaIndex) =>
  updateQuestionSettings({
    type: REMOVE_FORMULA,
    data: { questionId, formulaIndex },
  });

export const duplicateFormula = (questionId, formulaIndex) =>
  updateQuestionSettings({
    type: DUPLICATE_FORMULA,
    data: { questionId, formulaIndex },
  });
