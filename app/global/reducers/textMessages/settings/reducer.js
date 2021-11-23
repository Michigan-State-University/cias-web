import cloneDeep from 'lodash/cloneDeep';

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
const textMessageSettingsReducer = (textMessage, payload) => {
  const clonedTextMessage = cloneDeep(textMessage);
  switch (payload.type) {
    case CHANGE_SCHEDULING_VALUE:
      clonedTextMessage.schedulePayload = +payload.data.value;
      return clonedTextMessage;
    case CHANGE_SCHEDULING_TYPE:
      // When changing to `afterFill` set `schedulePayload` for correct sorting of the list
      if (payload.data.value === TextMessageScheduleOption.AFTER_FILL)
        clonedTextMessage.schedulePayload = 0;
    // fallthrough intentionally
    case CHANGE_FORMULA_VALUE:
    case CHANGE_TILE_NAME:
    case CHANGE_FORMULA_USED:
    case CHANGE_NO_FORMULA_TEXT:
    case CHANGE_TYPE:
      clonedTextMessage[payload.data.field] = payload.data.value;
      return clonedTextMessage;
    case CHANGE_SCHEDULING_FREQUENCY:
      clonedTextMessage.frequency = payload.data.value.frequency;
      clonedTextMessage.endAt = payload.data.value.endAt;
      return clonedTextMessage;
    case CHANGE_INCLUDED_DATA:
      return {
        ...clonedTextMessage,
        ...payload.data.value,
      };
    default:
      return textMessage;
  }
};

export default textMessageSettingsReducer;
