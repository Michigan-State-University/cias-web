import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_TEXT_MESSAGES_REQUEST,
  FETCH_TEXT_MESSAGES_SUCCESS,
  FETCH_TEXT_MESSAGES_ERROR,
  CHANGE_SELECTED_MESSAGE,
  CREATE_TEXT_MESSAGE_REQUEST,
  CREATE_TEXT_MESSAGE_SUCCESS,
  CREATE_TEXT_MESSAGE_ERROR,
  UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST,
  UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS,
  UPDATE_TEXT_MESSAGE_SETTINGS_ERROR,
  FETCH_VARIANTS_REQUEST,
  FETCH_VARIANTS_SUCCESS,
  FETCH_VARIANTS_ERROR,
  CREATE_VARIANT_REQUEST,
  CREATE_VARIANT_SUCCESS,
  CREATE_VARIANT_ERROR,
  REMOVE_TEXT_MESSAGE_REQUEST,
  REMOVE_TEXT_MESSAGE_SUCCESS,
  REMOVE_TEXT_MESSAGE_ERROR,
  UPDATE_TEXT_MESSAGE_VARIANT_REQUEST,
  UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS,
  UPDATE_TEXT_MESSAGE_VARIANT_ERROR,
  REMOVE_TEXT_MESSAGE_VARIANT_REQUEST,
  REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS,
  REMOVE_TEXT_MESSAGE_VARIANT_ERROR,
  CLONE_TEXT_MESSAGE_REQUEST,
  CLONE_TEXT_MESSAGE_SUCCESS,
  CLONE_TEXT_MESSAGE_ERROR,
  CHANGE_SELECTED_VARIANT,
} from './constants';

export const fetchTextMessagesRequest = sessionId =>
  actionBuilder(FETCH_TEXT_MESSAGES_REQUEST, { sessionId });
export const fetchTextMessagesSuccess = textMessages =>
  actionBuilder(FETCH_TEXT_MESSAGES_SUCCESS, {
    textMessages,
  });
export const fetchTextMessagesError = error =>
  actionBuilder(FETCH_TEXT_MESSAGES_ERROR, { error });

export const fetchVariantsRequest = () =>
  actionBuilder(FETCH_VARIANTS_REQUEST, {});
export const fetchVariantsSuccess = variants =>
  actionBuilder(FETCH_VARIANTS_SUCCESS, { variants });
export const fetchVariantsError = error =>
  actionBuilder(FETCH_VARIANTS_ERROR, { error });

export const changeSelectedMessageId = id =>
  actionBuilder(CHANGE_SELECTED_MESSAGE, { id });

export const changeSelectedVariantId = id =>
  actionBuilder(CHANGE_SELECTED_VARIANT, { id });

export const createTextMessageRequest = textMessage =>
  actionBuilder(CREATE_TEXT_MESSAGE_REQUEST, { textMessage });
export const createTextMessageSuccess = (textMessage, textMessageId) =>
  actionBuilder(CREATE_TEXT_MESSAGE_SUCCESS, { textMessage, textMessageId });
export const createTextMessageError = error =>
  actionBuilder(CREATE_TEXT_MESSAGE_ERROR, { error });

export const updateTextMessageSettingsRequest = value =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST, { value });
export const updateTextMessageSettingsSuccess = () =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS, {});
export const updateTextMessageSettingsError = error =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_ERROR, { error });

export const removeTextMessageRequest = textMessageId =>
  actionBuilder(REMOVE_TEXT_MESSAGE_REQUEST, { textMessageId });
export const removeTextMessageSuccess = () =>
  actionBuilder(REMOVE_TEXT_MESSAGE_SUCCESS, {});
export const removeTextMessageError = error =>
  actionBuilder(REMOVE_TEXT_MESSAGE_ERROR, { error });

export const createVariantRequest = () =>
  actionBuilder(CREATE_VARIANT_REQUEST, {});
export const createVariantSuccess = variant =>
  actionBuilder(CREATE_VARIANT_SUCCESS, { variant });
export const createVariantError = error =>
  actionBuilder(CREATE_VARIANT_ERROR, { error });

export const updateTextMessageVariantRequest = value =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_REQUEST, { value });
export const updateTextMessageVariantSuccess = () =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS, {});
export const updateTextMessageVariantError = error =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_ERROR, { error });

export const removeTextMessageVariantRequest = variantId =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_REQUEST, { variantId });
export const removeTextMessageVariantSuccess = () =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS, {});
export const removeTextMessageVariantError = error =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_ERROR, { error });

export const cloneTextMessageRequest = textMessageId =>
  actionBuilder(CLONE_TEXT_MESSAGE_REQUEST, { textMessageId });
export const cloneTextMessageSuccess = clonedTextMessage =>
  actionBuilder(CLONE_TEXT_MESSAGE_SUCCESS, { clonedTextMessage });
export const cloneTextMessageError = error =>
  actionBuilder(CLONE_TEXT_MESSAGE_ERROR, { error });
