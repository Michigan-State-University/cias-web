import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  addNewTlfbEvent,
  addNewTlfbEventError,
  addNewTlfbEventSuccess,
} from './actions';

import { TlfbActions, TlfbState } from './types';

export const initialState: TlfbState = {
  days: {},
  loaders: {
    createEvent: false,
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
          payload: { date, event },
        } = action;
        if (state.days[date]) {
          draft.days[date].events = [...state.days[date].events, ...event];
        } else {
          draft.days[date] = { events: event };
        }

        draft.loaders.createEvent = false;
        break;
    }
  });
