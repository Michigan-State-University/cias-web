import { QuestionTypes } from 'models/Question';

export const HIDE_SETTINGS_TAB_QUESTIONS: QuestionTypes[] = [
  QuestionTypes.SMS_QUESTION,
  QuestionTypes.SMS_INFORMATION_QUESTION,
];

export const HIDE_NARRATOR_TAB_QUESTIONS: QuestionTypes[] = [
  QuestionTypes.SMS_QUESTION,
  QuestionTypes.SMS_INFORMATION_QUESTION,
];

export const HIDE_BRANCHING_TAB_QUESTIONS: QuestionTypes[] = [
  QuestionTypes.FINISH,
  QuestionTypes.TLFB_CONFIG,
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
  QuestionTypes.HENRY_FORD_INITIAL,
];
