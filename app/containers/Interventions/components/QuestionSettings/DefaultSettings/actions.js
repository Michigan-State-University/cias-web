import { updateQuestionSettings } from 'containers/Interventions/containers/EditInterventionPage/actions';
import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
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
