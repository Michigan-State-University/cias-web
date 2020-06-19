import { updateQuestionSettings } from 'containers/Interventions/containers/EditInterventionPage/actions';
import { UPDATE_SETTINGS, ADD_BLOCK } from './constants';

export const updateSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_SETTINGS,
    data: { property, value },
  });

export const addBlock = (type, questionId) =>
  updateQuestionSettings({
    type: ADD_BLOCK,
    data: { type, questionId },
  });
