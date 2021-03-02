import cloneDeep from 'lodash/cloneDeep';
import {
  CHANGE_SCHEDULING_TYPE,
  CHANGE_SCHEDULING_VALUE,
  CHANGE_SCHEDULING_FREQUENCY,
  CHANGE_FORMULA_VALUE,
  CHANGE_TILE_NAME,
  CHANGE_END_AT,
} from './constants';

/**
 * @param  {TextMessage} textMessage
 * @param  {object} payload
 */
const textMessageSettingsReducer = (textMessage, payload) => {
  const clonedTextMessage = cloneDeep(textMessage);
  switch (payload.type) {
    case CHANGE_SCHEDULING_TYPE:
    case CHANGE_SCHEDULING_VALUE:
    case CHANGE_SCHEDULING_FREQUENCY:
    case CHANGE_FORMULA_VALUE:
    case CHANGE_TILE_NAME:
    case CHANGE_END_AT:
      clonedTextMessage[payload.data.field] = payload.data.value;
      return clonedTextMessage;

    default:
      return textMessage;
  }
};

export default textMessageSettingsReducer;
