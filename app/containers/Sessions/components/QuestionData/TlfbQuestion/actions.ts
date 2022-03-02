import { updateQuestionData } from 'global/reducers/questions';
import { Substance } from 'models/Question';

import {
  UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
  ADD_SUBSTANCE,
  EDIT_SUBSTANCE,
  REMOVE_SUBSTANCE,
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

export const editSubstance = (substanceIndex: number, substance: Substance) =>
  updateQuestionData({
    type: EDIT_SUBSTANCE,
    data: { substanceIndex, substance },
  });

export const removeSubstance = (substanceIndex: number) =>
  updateQuestionData({
    type: REMOVE_SUBSTANCE,
    data: { substanceIndex },
  });
