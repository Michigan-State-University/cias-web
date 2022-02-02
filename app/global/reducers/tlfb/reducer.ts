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
} from './actions';

import { TlfbActions, TlfbState } from './types';

export const initialState: TlfbState = {
  days: {},
  loaders: {
    createEvent: false,
  },
  eventCache: null,
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
          draft.eventCache = state.days[dayKey];
          draft.days[dayKey].events[eventIndex].name = name;
        }
        break;
      }

      case getType(editEventNameError): {
        const {
          payload: { dayKey },
        } = action;
        if (state.eventCache) {
          draft.days[dayKey] = state.eventCache;
          draft.eventCache = null;
        }
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
          draft.eventCache = state.days[dayKey];
          draft.days[dayKey].events.splice(eventIndex, 1);
        }
        break;
      }

      case getType(deleteEventError): {
        const {
          payload: { dayKey },
        } = action;
        if (state.eventCache) {
          draft.days[dayKey] = state.eventCache;
          draft.eventCache = null;
        }
        break;
      }
    }
  });
