import { createAction } from 'typesafe-actions';

import {
  ADD_NEW_EVENT,
  ADD_NEW_EVENT_ERROR,
  ADD_NEW_EVENT_SUCCESS,
  EDIT_EVENT_NAME_REQUEST,
  EDIT_EVENT_NAME_ERROR,
} from './constants';

export const addNewTlfbEvent = createAction(
  ADD_NEW_EVENT,
  (action) =>
    (questionGroupId: string, userSessionId: string, isoDay: string) =>
      action({ questionGroupId, userSessionId, isoDay }),
);

export const addNewTlfbEventSuccess = createAction(
  ADD_NEW_EVENT_SUCCESS,
  (action) => (date: string, event: any) => action({ date, event }),
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

export const editEventNameError = createAction(
  EDIT_EVENT_NAME_ERROR,
  (action) => (dayKey: string) => action({ dayKey }),
);
