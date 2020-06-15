import { updateQuestionSettings } from 'containers/Interventions/containers/EditInterventionPage/actions';
import { UPDATE_SETTINGS } from './constants';

export const updateSettings = (property, value) =>
  updateQuestionSettings({
    type: UPDATE_SETTINGS,
    data: { property, value },
  });
