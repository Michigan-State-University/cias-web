import { updateQuestionSettings } from 'containers/Interventions/containers/EditInterventionPage/actions';
import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_SPEECH_TEXT,
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

export const updateNarratorAnimation = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_NARRATOR_ANIMATION,
    data: { index, value, questionId },
  });

export const updateSpeechSettings = (index, value, questionId) =>
  updateQuestionSettings({
    type: UPDATE_SPEECH_TEXT,
    data: { index, value, questionId },
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
