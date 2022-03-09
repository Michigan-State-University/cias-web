import produce from 'immer';
import { getType } from 'typesafe-actions';
import { deleteItemById, updateItemById } from 'utils/reduxUtils';

import {
  addNewTlfbEventRequest,
  addNewTlfbEventError,
  addNewTlfbEventSuccess,
  editEventNameRequest,
  editEventNameError,
  deleteEventError,
  deleteEventRequest,
  editEventNameSuccess,
  deleteEventSuccess,
  addTlfbQuestionAnswerRequest,
  addTlfbQuestionAnswerError,
  addTlfbQuestionAnswerSuccess,
  editTlfbQuestionAnswerRequest,
  editTlfbQuestionAnswerError,
  editTlfbQuestionAnswerSuccess,
  fetchCalendarDataSuccess,
  fetchCalendarDataRequest,
  fetchCalendarDataError,
} from './actions';

import { TlfbAction, TlfbState } from './types';

export const tlfbReducerKey = 'tlfb';

export const initialState: TlfbState = {
  days: {},
  loaders: {
    createEvent: false,
    addTlfbQuestionAnswer: false,
    editTlfbQuestionAnswer: false,
    fetchCalendarData: false,
  },
  cache: {
    days: {},
  },
  errors: {
    fetchCalendarData: false,
  },
  answerSavedSuccessfully: false,
};

/* eslint-disable default-case, no-param-reassign */
export const tlfbReducer = (
  state: TlfbState = initialState,
  action: TlfbAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(addNewTlfbEventRequest):
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

      case getType(editEventNameRequest): {
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

      case getType(addTlfbQuestionAnswerRequest): {
        draft.loaders.addTlfbQuestionAnswer = true;
        draft.answerSavedSuccessfully = false;
        break;
      }

      case getType(addTlfbQuestionAnswerSuccess): {
        const {
          payload: { answer, dayKey },
        } = action;
        if (state.days[dayKey]) {
          draft.days[dayKey].answer = answer;
        } else {
          draft.days[dayKey] = { answer };
        }
        draft.cache.days = draft.days;
        draft.loaders.addTlfbQuestionAnswer = false;
        draft.answerSavedSuccessfully = true;
        break;
      }

      case getType(addTlfbQuestionAnswerError): {
        draft.loaders.addTlfbQuestionAnswer = false;
        break;
      }

      case getType(editTlfbQuestionAnswerRequest): {
        draft.loaders.editTlfbQuestionAnswer = true;
        draft.answerSavedSuccessfully = false;

        const {
          payload: { dayKey, body },
        } = action;
        if (draft.days[dayKey] && draft.days[dayKey].answer) {
          draft.days[dayKey].answer!.body = body;
        }
        break;
      }

      case getType(editTlfbQuestionAnswerSuccess): {
        draft.loaders.editTlfbQuestionAnswer = false;
        draft.answerSavedSuccessfully = true;
        draft.cache.days = state.days;
        break;
      }

      case getType(editTlfbQuestionAnswerError): {
        draft.loaders.editTlfbQuestionAnswer = false;
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
