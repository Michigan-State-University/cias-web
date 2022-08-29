import { createAction } from 'typesafe-actions';

import {
  EventData,
  TlfbQuestionAnswer,
  TlfbQuestionAnswerBody,
  CalendarData,
} from 'models/Tlfb';

import {
  ADD_NEW_EVENT_REQUEST,
  ADD_NEW_EVENT_ERROR,
  ADD_NEW_EVENT_SUCCESS,
  EDIT_EVENT_NAME_REQUEST,
  EDIT_EVENT_NAME_ERROR,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_ERROR,
  EDIT_EVENT_NAME_SUCCESS,
  DELETE_EVENT_SUCCESS,
  ADD_TLFB_QUESTION_ANSWER_ERROR,
  ADD_TLFB_QUESTION_ANSWER_REQUEST,
  ADD_TLFB_QUESTION_ANSWER_SUCCESS,
  EDIT_TLFB_QUESTION_ANSWER_ERROR,
  EDIT_TLFB_QUESTION_ANSWER_REQUEST,
  EDIT_TLFB_QUESTION_ANSWER_SUCCESS,
  FETCH_CALENDAR_DATA_REQUEST,
  FETCH_CALENDAR_DATA_SUCCESS,
  FETCH_CALENDAR_DATA_ERROR,
} from './constants';

export const addNewTlfbEventRequest = createAction(
  ADD_NEW_EVENT_REQUEST,
  (action) =>
    (questionGroupId: string, userSessionId: string, dayKey: string) =>
      action({ questionGroupId, userSessionId, dayKey }),
);

export const addNewTlfbEventSuccess = createAction(
  ADD_NEW_EVENT_SUCCESS,
  (action) => (date: string, events: EventData[]) => action({ date, events }),
);

export const addNewTlfbEventError = createAction(
  ADD_NEW_EVENT_ERROR,
  (action) => () => action({}),
);

export const editEventNameRequest = createAction(
  EDIT_EVENT_NAME_REQUEST,
  (action) => (eventId: number, name: string, dayKey: string) =>
    action({ eventId, name, dayKey }),
);

export const editEventNameSuccess = createAction(
  EDIT_EVENT_NAME_SUCCESS,
  (action) => () => action({}),
);

export const editEventNameError = createAction(
  EDIT_EVENT_NAME_ERROR,
  (action) => () => action({}),
);

export const deleteEventRequest = createAction(
  DELETE_EVENT_REQUEST,
  (action) => (eventId: number, dayKey: string) => action({ eventId, dayKey }),
);

export const deleteEventSuccess = createAction(
  DELETE_EVENT_SUCCESS,
  (action) => () => action({}),
);

export const deleteEventError = createAction(
  DELETE_EVENT_ERROR,
  (action) => () => action({}),
);

export const addTlfbQuestionAnswerRequest = createAction(
  ADD_TLFB_QUESTION_ANSWER_REQUEST,
  (action) =>
    (
      dayKey: string,
      userSessionId: string,
      questionGroupId: string,
      body: TlfbQuestionAnswerBody,
    ) =>
      action({ dayKey, userSessionId, questionGroupId, body }),
);

export const addTlfbQuestionAnswerError = createAction(
  ADD_TLFB_QUESTION_ANSWER_ERROR,
  (action) => () => action({}),
);

export const addTlfbQuestionAnswerSuccess = createAction(
  ADD_TLFB_QUESTION_ANSWER_SUCCESS,
  (action) => (answer: TlfbQuestionAnswer, dayKey: string) =>
    action({ answer, dayKey }),
);

export const editTlfbQuestionAnswerRequest = createAction(
  EDIT_TLFB_QUESTION_ANSWER_REQUEST,
  (action) =>
    (dayKey: string, body: TlfbQuestionAnswerBody, answerId: number) =>
      action({ dayKey, body, answerId }),
);

export const editTlfbQuestionAnswerError = createAction(
  EDIT_TLFB_QUESTION_ANSWER_ERROR,
  (action) => () => action({}),
);

export const editTlfbQuestionAnswerSuccess = createAction(
  EDIT_TLFB_QUESTION_ANSWER_SUCCESS,
  (action) => () => action({}),
);

export const fetchCalendarDataRequest = createAction(
  FETCH_CALENDAR_DATA_REQUEST,
  (action) => (userSessionId: string, questionGroupId: string) =>
    action({ userSessionId, questionGroupId }),
);

export const fetchCalendarDataSuccess = createAction(
  FETCH_CALENDAR_DATA_SUCCESS,
  (action) => (calendarData: CalendarData) => action({ calendarData }),
);

export const fetchCalendarDataError = createAction(
  FETCH_CALENDAR_DATA_ERROR,
  (action) => () => action({}),
);
