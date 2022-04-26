/* eslint-disable no-param-reassign */
import produce from 'immer';
import assign from 'lodash/assign';

import { TextMessageScheduleOption } from 'models/TextMessage';

import {
  CHANGE_SCHEDULING_TYPE,
  CHANGE_SCHEDULING_VALUE,
  CHANGE_SCHEDULING_FREQUENCY,
  CHANGE_FORMULA_VALUE,
  CHANGE_TILE_NAME,
  CHANGE_FORMULA_USED,
  CHANGE_NO_FORMULA_TEXT,
  CHANGE_TYPE,
  CHANGE_INCLUDED_DATA,
} from './constants';

/**
 * @param  {TextMessage} textMessage
 * @param  {object} payload
 */
const textMessageSettingsReducer = (textMessage, payload) =>
  produce(textMessage, (draft) => {
    switch (payload.type) {
      case CHANGE_SCHEDULING_VALUE:
        draft.schedulePayload = +payload.data.value;
        break;

      case CHANGE_SCHEDULING_TYPE:
        // When changing to `afterFill` set `schedulePayload` for correct sorting of the list
        if (payload.data.value === TextMessageScheduleOption.afterFill)
          draft.schedulePayload = 0;
      // fallthrough intentionally
      case CHANGE_FORMULA_VALUE:
      case CHANGE_TILE_NAME:
      case CHANGE_FORMULA_USED:
      case CHANGE_NO_FORMULA_TEXT:
      case CHANGE_TYPE:
        draft[payload.data.field] = payload.data.value;
        break;

      case CHANGE_SCHEDULING_FREQUENCY:
        draft.frequency = payload.data.value.frequency;
        draft.endAt = payload.data.value.endAt;
        break;

      case CHANGE_INCLUDED_DATA:
        assign(draft, payload.data.value);
        break;

      default:
    }
  });

export default textMessageSettingsReducer;
