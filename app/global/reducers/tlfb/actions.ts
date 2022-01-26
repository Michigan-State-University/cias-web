import { createAction } from 'typesafe-actions';

import {
  ADD_NEW_EVENT,
  ADD_NEW_EVENT_ERROR,
  ADD_NEW_EVENT_SUCCESS,
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
