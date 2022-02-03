import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  addNewTlfbEvent,
  addNewTlfbEventError,
  addNewTlfbEventSuccess,
  editEventName,
  editEventNameError,
  deleteEventError,
  deleteEventRequest,
  editEventNameSuccess,
  deleteEventSuccess,
} from './actions';

import { TlfbActions, TlfbState } from './types';

export const initialState: TlfbState = {
  days: {},
  loaders: {
    createEvent: false,
  },
  cache: {
    days: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
export const tlfbReducer = (
  state: TlfbState = initialState,
  action: TlfbActions,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(addNewTlfbEvent):
        draft.loaders.createEvent = true;
        break;
      case getType(addNewTlfbEventError):
        draft.loaders.createEvent = false;
        break;
      case getType(addNewTlfbEventSuccess):
        const {
          payload: { date, events },
        } = action;
        if (state.days[date]) {
          draft.days[date].events = [...state.days[date].events, ...events];
        } else {
          draft.days[date] = { events };
        }
        draft.cache.days = draft.days;
        draft.loaders.createEvent = false;
        break;

      case getType(editEventName): {
        const {
          payload: { dayKey, eventId, name },
        } = action;
        const eventIndex = state.days[dayKey]?.events.findIndex(
          ({ id }) => id === eventId,
        );
        if (eventIndex !== undefined && eventIndex !== -1) {
          draft.days[dayKey].events[eventIndex].name = name;
        }
        break;
      }

      case getType(editEventNameSuccess): {
        draft.cache.days = state.days;
        break;
      }

      case getType(editEventNameError): {
        draft.days = state.cache.days;
        break;
      }

      case getType(deleteEventRequest): {
        const {
          payload: { dayKey, eventId },
        } = action;
        const eventIndex = state.days[dayKey]?.events.findIndex(
          ({ id }) => id === eventId,
        );
        if (eventIndex !== undefined && eventIndex !== -1) {
          draft.days[dayKey].events.splice(eventIndex, 1);
        }
        break;
      }

      case getType(deleteEventSuccess): {
        draft.cache.days = state.days;
        break;
      }

      case getType(deleteEventError): {
        draft.days = state.cache.days;
        break;
      }
    }
  });
