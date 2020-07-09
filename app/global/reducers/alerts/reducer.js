/*
 *
 * alerts reducer
 *
 */
import produce from 'immer';
import { set } from 'lodash';

import { SHOW_ALERT, CLEAR_ALERT } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
export const alertsReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case SHOW_ALERT:
        set(draft, payload.alertId, true);
        break;
      case CLEAR_ALERT:
        set(draft, payload.alertId, false);
        break;
    }
  });
