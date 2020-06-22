import { updateQuestionSettings } from 'containers/Interventions/containers/EditInterventionPage/actions';
import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
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
