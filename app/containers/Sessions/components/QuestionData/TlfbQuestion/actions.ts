import { updateQuestionData } from 'global/reducers/questions';
import { Substance } from 'models/Question';

import {
  UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
  ADD_SUBSTANCE,
  EDIT_SUBSTANCE,
} from './constants';

export const updateQuestion = (value: string, type: string) =>
  updateQuestionData({ type, data: { value } });

export const updateSubstancesWithGroupToggle = (option: boolean) =>
  updateQuestionData({
    type: UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
    data: { option },
  });

export const addSubstance = (substance: Substance) =>
  updateQuestionData({
    type: ADD_SUBSTANCE,
    data: { substance },
  });

export const editSubstance = (substanceId: number, substance: Substance) =>
  updateQuestionData({
    type: EDIT_SUBSTANCE,
    data: { substanceId, substance },
  });
