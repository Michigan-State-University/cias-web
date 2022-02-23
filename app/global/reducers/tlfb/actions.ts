import { createAction } from 'typesafe-actions';

import { EventData, SubstanceData, SubstanceBody } from 'models/Tlfb';
import { CalendarData } from 'components/Calendar/types';

import {
  ADD_NEW_EVENT,
  ADD_NEW_EVENT_ERROR,
  ADD_NEW_EVENT_SUCCESS,
  EDIT_EVENT_NAME_REQUEST,
  EDIT_EVENT_NAME_ERROR,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_ERROR,
  EDIT_EVENT_NAME_SUCCESS,
  DELETE_EVENT_SUCCESS,
  ADD_NEW_SUBSTANCE_ERROR,
  ADD_NEW_SUBSTANCE_REQUEST,
  ADD_NEW_SUBSTANCE_SUCCESS,
  EDIT_SUBSTANCE_ERROR,
  EDIT_SUBSTANCE_REQUEST,
  EDIT_SUBSTANCE_SUCCESS,
  FETCH_CALENDAR_DATA_REQUEST,
  FETCH_CALENDAR_DATA_SUCCESS,
  FETCH_CALENDAR_DATA_ERROR,
} from './constants';

export const addNewTlfbEvent = createAction(
  ADD_NEW_EVENT,
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

export const editEventName = createAction(
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

export const addNewTlfbSubstance = createAction(
  ADD_NEW_SUBSTANCE_REQUEST,
  (action) =>
    (
      dayKey: string,
      userSessionId: string,
      questionGroupId: string,
      body: SubstanceBody,
    ) =>
      action({ dayKey, userSessionId, questionGroupId, body }),
);

export const addNewTlfbSubstanceError = createAction(
  ADD_NEW_SUBSTANCE_ERROR,
  (action) => () => action({}),
);

export const addNewTlfbSubstanceSuccess = createAction(
  ADD_NEW_SUBSTANCE_SUCCESS,
  (action) => (substance: SubstanceData, dayKey: string) =>
    action({ substance, dayKey }),
);

export const editTlfbSubstance = createAction(
  EDIT_SUBSTANCE_REQUEST,
  (action) => (dayKey: string, body: SubstanceBody, substanceId: number) =>
    action({ dayKey, body, substanceId }),
);

export const editTlfbSubstanceError = createAction(
  EDIT_SUBSTANCE_ERROR,
  (action) => () => action({}),
);

export const editTlfbSubstanceSuccess = createAction(
  EDIT_SUBSTANCE_SUCCESS,
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
