import { updateQuestionData } from 'global/reducers/questions';
import { Substance } from 'models/Question';

import {
  UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
  ADD_SUBSTANCE,
  ADD_SUBSTANCE_GROUP,
  EDIT_SUBSTANCE,
  REMOVE_SUBSTANCE,
  EDIT_SUBSTANCE_GROUP,
  EDIT_SUBSTANCE_IN_GROUP,
  REMOVE_SUBSTANCE_IN_GROUP,
  ADD_SUBSTANCE_IN_GROUP,
  REMOVE_SUBSTANCE_GROUP,
} from './constants';

export const updateQuestion = (value: string, type: string) =>
  updateQuestionData({ type, data: { value } });

export const updateSubstancesWithGroupToggle = (
  option: boolean,
  tlfbVariables: string[],
) =>
  updateQuestionData({
    type: UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
    data: { option, tlfbVariables },
  });

// NOT GROUPED SUBSTANCES

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

// GROUPED SUBSTANCES

export const addSubstanceGroup = (name: string) =>
  updateQuestionData({
    type: ADD_SUBSTANCE_GROUP,
    data: { name },
  });

export const addSubstanceInGroup = (substance: Substance, groupIndex: number) =>
  updateQuestionData({
    type: ADD_SUBSTANCE_IN_GROUP,
    data: { substance, groupIndex },
  });

export const editSubstanceGroup = (name: string, groupIndex: number) =>
  updateQuestionData({
    type: EDIT_SUBSTANCE_GROUP,
    data: { name, groupIndex },
  });

export const editSubstanceInGroup = (
  substanceIndex: number,
  groupIndex: number,
  substance: Substance,
) =>
  updateQuestionData({
    type: EDIT_SUBSTANCE_IN_GROUP,
    data: { substanceIndex, groupIndex, substance },
  });

export const removeSubstanceInGroup = (
  groupIndex: number,
  substanceIndex: number,
) =>
  updateQuestionData({
    type: REMOVE_SUBSTANCE_IN_GROUP,
    data: { groupIndex, substanceIndex },
  });

export const removeSubstanceGroup = (groupIndex: number) =>
  updateQuestionData({
    type: REMOVE_SUBSTANCE_GROUP,
    data: { groupIndex },
  });
