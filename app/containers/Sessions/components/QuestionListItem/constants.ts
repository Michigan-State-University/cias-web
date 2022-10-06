import { QuestionTypes } from 'models/Question';

export const NON_MANAGEABLE_SCREENS = [
  QuestionTypes.FINISH,
  QuestionTypes.TLFB_CONFIG,
  QuestionTypes.TLFB_QUESTION,
  QuestionTypes.TLFB_EVENTS,
];

export const NON_DUPLICABLE_SCREENS = [
  QuestionTypes.NAME,
  QuestionTypes.PARTICIPANT_REPORT,
  QuestionTypes.PHONE,
  QuestionTypes.HENRY_FORD_INITIAL,
];

// screens whose variable is not editable
export const VARIABLE_NON_EDITABLE_SCREENS = [QuestionTypes.NAME];

export const ONLY_NARRATOR_TAB_SCREENS = [
  QuestionTypes.TLFB_QUESTION,
  QuestionTypes.TLFB_EVENTS,
];
