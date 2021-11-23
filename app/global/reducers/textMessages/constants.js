import { TextMessageType } from 'models/TextMessage';
import { generateFiltersArray } from './utils';

export const FETCH_TEXT_MESSAGES_REQUEST =
  'app/TextMessages/FETCH_TEXT_MESSAGES_REQUEST';
export const FETCH_TEXT_MESSAGES_SUCCESS =
  'app/TextMessages/FETCH_TEXT_MESSAGES_SUCCESS';
export const FETCH_TEXT_MESSAGES_ERROR =
  'app/TextMessages/FETCH_TEXT_MESSAGES_ERROR';

export const CHANGE_SELECTED_MESSAGE =
  'app/TextMessages/CHANGE_SELECTED_MESSAGE';
export const CHANGE_SELECTED_VARIANT =
  'app/TextMessages/CHANGE_SELECTED_VARIANT';

export const FETCH_VARIANTS_AND_PHONES_REQUEST =
  'app/TextMessages/FETCH_VARIANTS_AND_PHONES_REQUEST';
export const FETCH_VARIANTS_AND_PHONES_SUCCESS =
  'app/TextMessages/FETCH_VARIANTS_AND_PHONES_SUCCESS';
export const FETCH_VARIANTS_AND_PHONES_ERROR =
  'app/TextMessages/FETCH_VARIANTS_AND_PHONES_ERROR';

export const CREATE_TEXT_MESSAGE_REQUEST =
  'app/TextMessages/CREATE_TEXT_MESSAGE_REQUEST';
export const CREATE_TEXT_MESSAGE_SUCCESS =
  'app/TextMessages/CREATE_TEXT_MESSAGE_SUCCESS';
export const CREATE_TEXT_MESSAGE_ERROR =
  'app/TextMessages/CREATE_TEXT_MESSAGE_ERROR';

export const UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST';
export const UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS';
export const UPDATE_TEXT_MESSAGE_SETTINGS_ERROR =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_SETTINGS_ERROR';

export const UPDATE_TEXT_MESSAGE_VARIANT_REQUEST =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_VARIANT_REQUEST';
export const UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS';
export const UPDATE_TEXT_MESSAGE_VARIANT_ERROR =
  'app/TextMessages/UPDATE_TEXT_MESSAGE_VARIANT_ERROR';

export const REMOVE_TEXT_MESSAGE_REQUEST =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_REQUEST';
export const REMOVE_TEXT_MESSAGE_SUCCESS =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_SUCCESS';
export const REMOVE_TEXT_MESSAGE_ERROR =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_ERROR';

export const CREATE_VARIANT_REQUEST = 'app/TextMessages/CREATE_VARIANT_REQUEST';
export const CREATE_VARIANT_SUCCESS = 'app/TextMessages/CREATE_VARIANT_SUCCESS';
export const CREATE_VARIANT_ERROR = 'app/TextMessages/CREATE_VARIANT_ERROR';

export const REMOVE_TEXT_MESSAGE_VARIANT_REQUEST =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_VARIANT_REQUEST';
export const REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS';
export const REMOVE_TEXT_MESSAGE_VARIANT_ERROR =
  'app/TextMessages/REMOVE_TEXT_MESSAGE_VARIANT_ERROR';

export const CLONE_TEXT_MESSAGE_REQUEST =
  'app/TextMessages/CLONE_TEXT_MESSAGE_REQUEST';
export const CLONE_TEXT_MESSAGE_SUCCESS =
  'app/TextMessages/CLONE_TEXT_MESSAGE_SUCCESS';
export const CLONE_TEXT_MESSAGE_ERROR =
  'app/TextMessages/CLONE_TEXT_MESSAGE_ERROR';

export const ADD_PHONE_REQUEST = 'app/TextMessages/ADD_PHONE_REQUEST';
export const ADD_PHONE_SUCCESS = 'app/TextMessages/ADD_PHONE_SUCCESS';
export const ADD_PHONE_ERROR = 'app/TextMessages/ADD_PHONE_ERROR';

export const REMOVE_PHONE_REQUEST = 'app/TextMessages/REMOVE_PHONE_REQUEST';
export const REMOVE_PHONE_SUCCESS = 'app/TextMessages/REMOVE_PHONE_SUCCESS';
export const REMOVE_PHONE_ERROR = 'app/TextMessages/REMOVE_PHONE_ERROR';

export const UPDATE_PHONE_REQUEST = 'app/TextMessages/UPDATE_PHONE_REQUEST';
export const UPDATE_PHONE_SUCCESS = 'app/TextMessages/UPDATE_PHONE_SUCCESS';
export const UPDATE_PHONE_ERROR = 'app/TextMessages/UPDATE_PHONE_ERROR';

export const SET_FILTERS = 'app/TextMessages/SET_FILTERS';

export const PER_PAGE = 10;

export const INITIAL_FILTERS = generateFiltersArray([
  TextMessageType.NORMAL,
  TextMessageType.ALERT,
]);
