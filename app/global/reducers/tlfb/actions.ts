import { createAction } from 'typesafe-actions';

import { EventData } from 'models/Tlfb';

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
