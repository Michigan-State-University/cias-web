/*
 *
 * AnswerSessionPage constants
 *
 */

import { QuestionTypes } from 'models/Question';

export const SUBMIT_ANSWER_REQUEST =
  'app/AnswerSessionPage/SUBMIT_ANSWER_REQUEST';
export const SUBMIT_ANSWER_SUCCESS =
  'app/AnswerSessionPage/SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_ERROR = 'app/AnswerSessionPage/SUBMIT_ANSWER_ERROR';
export const SELECT_ANSWER = 'app/AnswerSessionPage/SELECT_ANSWER';
export const START_SESSION = 'app/AnswerSessionPage/START_SESSION';

export const RESET_SESSION = 'app/AnswerSessionPage/RESET_SESSION';
export const RESET_ANSWERS = 'app/AnswerSessionPage/RESET_ANSWERS';
export const REDIRECT_TO_PREVIEW = 'app/AnswerSessionPage/REDIRECT_TO_PREVIEW';

export const NUMBER_VALIDATION_ERROR =
  'app/AnswerSessionPage/NUMBER_VALIDATION_ERROR';

export const PARTICIPANT_REPORT_VALIDATION_ERROR =
  'app/AnswerSessionPage/PARTICIPANT_REPORT_VALIDATION_ERROR';

export const CHANGE_PREVIEW_MODE = 'app/AnswerSessionPage/CHANGE_PREVIEW_MODE';

export const CHANGE_IS_ANIMATING = 'app/AnswerSessionPage/CHANGE_IS_ANIMATING';

export const SET_FEEDBACK_SCREEN_SETTINGS =
  'app/AnswerSessionPage/SET_FEEDBACK_SCREEN_SETTINGS';

export const ZERO_DIVISION_FORMULA_ERROR = 'ZeroDivisionError';
export const OTHER_FORMULA_ERROR = 'OtherFormulaError';
export const REFLECTION_MISS_MATCH = 'ReflectionMissMatch';
export const NO_BRANCHING_TARGET = 'NoBranchingTarget';
export const RANDOMIZATION_MISS_MATCH = 'RandomizationMissMatch';
export const FORBIDDEN_CAT_MH_BRANCHING = 'ForbiddenBranchingToCatMhSession';

export const CREATE_USER_SESSION_REQUEST =
  'app/AnswerSessionPage/CREATE_USER_SESSION_REQUEST';

export const CREATE_USER_SESSION_SUCCESS =
  'app/AnswerSessionPage/CREATE_USER_SESSION_SUCCESS';

export const CREATE_USER_SESSION_FAILURE =
  'app/AnswerSessionPage/CREATE_USER_SESSION_FAILURE';

export const NEXT_QUESTION_REQUEST =
  'app/AnswerSessionPage/NEXT_QUESTION_REQUEST';

export const NEXT_QUESTION_SUCCESS =
  'app/AnswerSessionPage/NEXT_QUESTION_SUCCESS';

export const NEXT_QUESTION_FAILURE =
  'app/AnswerSessionPage/NEXT_QUESTION_FAILURE';

export const CLEAR_ERROR = 'app/AnswerSessionPage/CLEAR_ERROR';
export const CHANGE_USER_SESSION_ID =
  'app/AnswerSessionPage/CHANGE_USER_SESSION_ID';

export const SET_CURRENT_BLOCK_INDEX =
  'app/AnswerSessionPage/SET_CURRENT_BLOCK_INDEX';

export const TOGGLE_TEXT_TRANSCRIPT =
  'app/AnswerSessionPage/TOGGLE_TEXT_TRANSCRIPT';

export const SET_TRANSITIONAL_USER_SESSION_ID =
  'app/AnswerSessionPage/SET_TRANSITIONAL_USER_SESSION_ID';

export const SAVE_QUICK_EXIT_EVENT_REQUEST =
  'app/AnswerSessionPage/SAVE_QUICK_EXIT_EVENT_REQUEST';

export const VERIFY_PATIENT_DATA_REQUEST =
  'app/AnswerSessionPage/VERIFY_PATIENT_DATA_REQUEST';
export const VERIFY_PATIENT_DATA_SUCCESS =
  'app/AnswerSessionPage/VERIFY_PATIENT_DATA_SUCCESS';
export const VERIFY_PATIENT_DATA_ERROR =
  'app/AnswerSessionPage/VERIFY_PATIENT_DATA_ERROR';

export const QUESTION_TITLE_ID = 'question-title';

export const QUESTION_SUBTITLE_ID = 'question-subtitle';

export const NAME_QUESTION_NAME_ID = 'name-question-name';

export const NAME_QUESTION_SPELL_NAME_ID = 'name-question-spell-name';

export const NOT_SKIPPABLE_QUESTIONS = [
  QuestionTypes.FINISH,
  QuestionTypes.FEEDBACK,
  QuestionTypes.INFORMATION,
  QuestionTypes.EXTERNAL_LINK,
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
  QuestionTypes.HENRY_FORD_INITIAL,
];

export const FULL_SIZE_QUESTIONS = [
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
];

export const CONFIRMABLE_QUESTIONS = [
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
];

export const NO_CONTINUE_BUTTON_QUESTIONS = [
  QuestionTypes.FINISH,
  QuestionTypes.HENRY_FORD_INITIAL,
];
