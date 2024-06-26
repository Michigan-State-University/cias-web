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
  FETCH_VARIANTS_AND_PHONES_REQUEST,
  FETCH_VARIANTS_AND_PHONES_SUCCESS,
  FETCH_VARIANTS_AND_PHONES_ERROR,
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
  REORDER_TEXT_MESSAGE_VARIANTS_REQUEST,
  REORDER_TEXT_MESSAGE_VARIANTS_SUCCESS,
  REORDER_TEXT_MESSAGE_VARIANTS_ERROR,
  CLONE_TEXT_MESSAGE_REQUEST,
  CLONE_TEXT_MESSAGE_SUCCESS,
  CLONE_TEXT_MESSAGE_ERROR,
  CHANGE_SELECTED_VARIANT,
  ADD_PHONE_REQUEST,
  ADD_PHONE_SUCCESS,
  ADD_PHONE_ERROR,
  REMOVE_PHONE_REQUEST,
  REMOVE_PHONE_SUCCESS,
  REMOVE_PHONE_ERROR,
  UPDATE_PHONE_REQUEST,
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_ERROR,
  SET_FILTERS,
  SET_TEXT_MESSAGES_COUNT,
  UPLOAD_TEXT_MESSAGE_ATTACHMENT_REQUEST,
  UPLOAD_TEXT_MESSAGE_ATTACHMENT_SUCCESS,
  UPLOAD_TEXT_MESSAGE_ATTACHMENT_ERROR,
  DELETE_TEXT_MESSAGE_ATTACHMENT_REQUEST,
  DELETE_TEXT_MESSAGE_ATTACHMENT_SUCCESS,
  DELETE_TEXT_MESSAGE_ATTACHMENT_ERROR,
  UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST,
  UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_SUCCESS,
  UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_ERROR,
  DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST,
  DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_SUCCESS,
  DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_ERROR,
  CREATE_SMS_LINK_REQUEST,
  CREATE_SMS_LINK_SUCCESS,
  CREATE_SMS_LINK_ERROR,
} from './constants';

export const fetchTextMessagesRequest = (sessionId) =>
  actionBuilder(FETCH_TEXT_MESSAGES_REQUEST, { sessionId });
export const fetchTextMessagesSuccess = (textMessages) =>
  actionBuilder(FETCH_TEXT_MESSAGES_SUCCESS, {
    textMessages,
  });
export const fetchTextMessagesError = (error) =>
  actionBuilder(FETCH_TEXT_MESSAGES_ERROR, { error });

export const fetchVariantsAndPhonesRequest = () =>
  actionBuilder(FETCH_VARIANTS_AND_PHONES_REQUEST, {});
export const fetchVariantsAndPhonesSuccess = (variants, phones, smsLinks) =>
  actionBuilder(FETCH_VARIANTS_AND_PHONES_SUCCESS, {
    variants,
    phones,
    smsLinks,
  });
export const fetchVariantsAndPhonesError = (error) =>
  actionBuilder(FETCH_VARIANTS_AND_PHONES_ERROR, { error });

export const changeSelectedMessageId = (id) =>
  actionBuilder(CHANGE_SELECTED_MESSAGE, { id });

export const changeSelectedVariantId = (id) =>
  actionBuilder(CHANGE_SELECTED_VARIANT, { id });

export const createTextMessageRequest = (textMessage) =>
  actionBuilder(CREATE_TEXT_MESSAGE_REQUEST, { textMessage });
export const createTextMessageSuccess = (textMessage, textMessageId) =>
  actionBuilder(CREATE_TEXT_MESSAGE_SUCCESS, { textMessage, textMessageId });
export const createTextMessageError = (error) =>
  actionBuilder(CREATE_TEXT_MESSAGE_ERROR, { error });

export const updateTextMessageSettingsRequest = (value) =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST, { value });
export const updateTextMessageSettingsSuccess = () =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS, {});
export const updateTextMessageSettingsError = (error) =>
  actionBuilder(UPDATE_TEXT_MESSAGE_SETTINGS_ERROR, { error });

export const uploadTextMessageAttachmentRequest = (
  textMessageId,
  noFormulaAttachmentFile,
) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_ATTACHMENT_REQUEST, {
    textMessageId,
    noFormulaAttachmentFile,
  });
export const uploadTextMessageAttachmentSuccess = (
  textMessageId,
  noFormulaAttachment,
) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_ATTACHMENT_SUCCESS, {
    textMessageId,
    noFormulaAttachment,
  });
export const uploadTextMessageAttachmentError = (textMessageId, error) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_ATTACHMENT_ERROR, { textMessageId, error });

export const deleteTextMessageAttachmentRequest = (textMessageId) =>
  actionBuilder(DELETE_TEXT_MESSAGE_ATTACHMENT_REQUEST, { textMessageId });
export const deleteTextMessageAttachmentSuccess = () =>
  actionBuilder(DELETE_TEXT_MESSAGE_ATTACHMENT_SUCCESS, {});
export const deleteTextMessageAttachmentError = (error) =>
  actionBuilder(DELETE_TEXT_MESSAGE_ATTACHMENT_ERROR, { error });

export const removeTextMessageRequest = (textMessageId) =>
  actionBuilder(REMOVE_TEXT_MESSAGE_REQUEST, { textMessageId });
export const removeTextMessageSuccess = () =>
  actionBuilder(REMOVE_TEXT_MESSAGE_SUCCESS, {});
export const removeTextMessageError = (error) =>
  actionBuilder(REMOVE_TEXT_MESSAGE_ERROR, { error });

export const createVariantRequest = () =>
  actionBuilder(CREATE_VARIANT_REQUEST, {});
export const createVariantSuccess = (variant) =>
  actionBuilder(CREATE_VARIANT_SUCCESS, { variant });
export const createVariantError = (error) =>
  actionBuilder(CREATE_VARIANT_ERROR, { error });

export const updateTextMessageVariantRequest = (value) =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_REQUEST, { value });
export const updateTextMessageVariantSuccess = () =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS, {});
export const updateTextMessageVariantError = (error) =>
  actionBuilder(UPDATE_TEXT_MESSAGE_VARIANT_ERROR, { error });

export const uploadTextMessageVariantAttachmentRequest = (
  textMessageId,
  variantId,
  attachmentFile,
) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST, {
    textMessageId,
    variantId,
    attachmentFile,
  });
export const uploadTextMessageVariantAttachmentSuccess = (
  textMessageId,
  variantId,
  attachment,
) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_SUCCESS, {
    textMessageId,
    variantId,
    attachment,
  });
export const uploadTextMessageVariantAttachmentError = (
  textMessageId,
  variantId,
  error,
) =>
  actionBuilder(UPLOAD_TEXT_MESSAGE_VARIANT_ATTACHMENT_ERROR, {
    textMessageId,
    variantId,
    error,
  });

export const deleteTextMessageVariantAttachmentRequest = (
  textMessageId,
  variantId,
) =>
  actionBuilder(DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_REQUEST, {
    textMessageId,
    variantId,
  });
export const deleteTextMessageVariantAttachmentSuccess = () =>
  actionBuilder(DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_SUCCESS, {});
export const deleteTextMessageVariantAttachmentError = (error) =>
  actionBuilder(DELETE_TEXT_MESSAGE_VARIANT_ATTACHMENT_ERROR, { error });

export const removeTextMessageVariantRequest = (variantId) =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_REQUEST, { variantId });
export const removeTextMessageVariantSuccess = () =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS, {});
export const removeTextMessageVariantError = (error) =>
  actionBuilder(REMOVE_TEXT_MESSAGE_VARIANT_ERROR, { error });

export const reorderTextMessageVariantsRequest = (
  smsPlanId,
  reorderedVariants,
) =>
  actionBuilder(REORDER_TEXT_MESSAGE_VARIANTS_REQUEST, {
    smsPlanId,
    reorderedVariants,
  });
export const reorderTextMessageVariantsSuccess = () =>
  actionBuilder(REORDER_TEXT_MESSAGE_VARIANTS_SUCCESS, {});
export const reorderTextMessageVariantsError = (error) =>
  actionBuilder(REORDER_TEXT_MESSAGE_VARIANTS_ERROR, error);

export const cloneTextMessageRequest = (textMessageId) =>
  actionBuilder(CLONE_TEXT_MESSAGE_REQUEST, { textMessageId });
export const cloneTextMessageSuccess = (clonedTextMessage) =>
  actionBuilder(CLONE_TEXT_MESSAGE_SUCCESS, { clonedTextMessage });
export const cloneTextMessageError = (error) =>
  actionBuilder(CLONE_TEXT_MESSAGE_ERROR, { error });

export const addPhoneRequest = () => actionBuilder(ADD_PHONE_REQUEST, {});
export const addPhoneSuccess = (phone) =>
  actionBuilder(ADD_PHONE_SUCCESS, { phone });
export const addPhoneError = (error) =>
  actionBuilder(ADD_PHONE_ERROR, { error });

export const removePhoneRequest = (phoneId) =>
  actionBuilder(REMOVE_PHONE_REQUEST, { phoneId });
export const removePhoneSuccess = (phoneId) =>
  actionBuilder(REMOVE_PHONE_SUCCESS, { phoneId });
export const removePhoneError = (error) =>
  actionBuilder(REMOVE_PHONE_ERROR, { error });

export const updatePhoneRequest = (phoneId, phoneAttributes) =>
  actionBuilder(UPDATE_PHONE_REQUEST, { phoneId, phoneAttributes });
export const updatePhoneSuccess = () => actionBuilder(UPDATE_PHONE_SUCCESS, {});
export const updatePhoneError = (error) =>
  actionBuilder(UPDATE_PHONE_ERROR, { error });

export const setFiltersAction = (filters) =>
  actionBuilder(SET_FILTERS, { filters });

export const setTextMessagesCount = (count) =>
  actionBuilder(SET_TEXT_MESSAGES_COUNT, { count });

export const createSmsLinkRequest = (smsPlanId, linkType, url, variable) =>
  actionBuilder(CREATE_SMS_LINK_REQUEST, {
    smsPlanId,
    linkType,
    url,
    variable,
  });
export const createSmsLinkSuccess = (smsLink) =>
  actionBuilder(CREATE_SMS_LINK_SUCCESS, { smsLink });
export const createSmsLinkError = (error) =>
  actionBuilder(CREATE_SMS_LINK_ERROR, { error });
