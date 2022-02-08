import produce from 'immer';
import { getType } from 'typesafe-actions';
import { deleteItemById, updateItemById } from 'utils/reduxUtils';

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
  addNewTlfbSubstance,
  addNewTlfbSubstanceError,
  addNewTlfbSubstanceSuccess,
  editTlfbSubstance,
  editTlfbSubstanceError,
  editTlfbSubstanceSuccess,
  fetchCalendarDataSuccess,
  fetchCalendarDataRequest,
  fetchCalendarDataError,
} from './actions';

import { TlfbActions, TlfbState } from './types';

export const initialState: TlfbState = {
  days: {},
  loaders: {
    createEvent: false,
    createSubstance: false,
    fetchCalendarData: false,
  },
  cache: {
    days: {},
  },
  errors: {
    fetchCalendarData: false,
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
          draft.days[date].events = [
            ...(state.days[date]?.events || []),
            ...events,
          ];
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
        updateItemById(draft.days[dayKey]?.events || [], eventId, (el) => ({
          ...el,
          name,
        }));
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
        deleteItemById(draft.days[dayKey]?.events || [], eventId);
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

      case getType(addNewTlfbSubstance): {
        draft.loaders.createSubstance = true;
        break;
      }

      case getType(addNewTlfbSubstanceSuccess): {
        const {
          payload: { substance, dayKey },
        } = action;
        if (state.days[dayKey]) {
          draft.days[dayKey].substance = substance;
        } else {
          draft.days[dayKey] = { substance };
        }
        draft.cache.days = draft.days;
        draft.loaders.createSubstance = false;
        break;
      }

      case getType(addNewTlfbSubstanceError): {
        draft.loaders.createSubstance = false;
        break;
      }

      case getType(editTlfbSubstance): {
        const {
          payload: { dayKey, body },
        } = action;
        if (draft.days[dayKey] && draft.days[dayKey].substance) {
          // @ts-ignore
          draft.days[dayKey].substance.body = body;
        }
        break;
      }

      case getType(editTlfbSubstanceSuccess): {
        draft.cache.days = state.days;
        break;
      }

      case getType(editTlfbSubstanceError): {
        state.days = draft.cache.days;
        break;
      }

      case getType(fetchCalendarDataRequest): {
        draft.errors.fetchCalendarData = false;
        draft.loaders.fetchCalendarData = true;

        break;
      }

      case getType(fetchCalendarDataSuccess): {
        const {
          payload: { calendarData },
        } = action;
        state.days = calendarData;
        draft.cache.days = calendarData;
        draft.loaders.fetchCalendarData = false;
        draft.loaders.fetchCalendarData = false;
        break;
      }

      case getType(fetchCalendarDataError): {
        draft.errors.fetchCalendarData = true;
        draft.loaders.fetchCalendarData = false;
        break;
      }
    }
  });
