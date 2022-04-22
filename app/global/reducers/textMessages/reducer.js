import produce, { current } from 'immer';
import clone from 'lodash/cloneDeep';

import { sortTextMessagesByDate } from 'models/TextMessage/utils';
import {
  assignDraftItems,
  deleteItemById,
  updateItemById,
} from 'utils/reduxUtils';

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
  CHANGE_SELECTED_VARIANT,
  CLONE_TEXT_MESSAGE_REQUEST,
  CLONE_TEXT_MESSAGE_SUCCESS,
  CLONE_TEXT_MESSAGE_ERROR,
  ADD_PHONE_REQUEST,
  ADD_PHONE_SUCCESS,
  ADD_PHONE_ERROR,
  REMOVE_PHONE_REQUEST,
  REMOVE_PHONE_SUCCESS,
  REMOVE_PHONE_ERROR,
  UPDATE_PHONE_REQUEST,
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_ERROR,
  INITIAL_FILTERS,
  SET_FILTERS,
} from './constants';
import textMessageSettingsReducer from './settings/reducer';
import textMessageVariantReducer from './variants/reducer';

export const initialState = {
  textMessages: [],
  selectedMessageId: null,
  selectedVariantId: null,
  textMessagesSize: 0,
  loaders: {
    fetchTextMessagesLoading: true,
    fetchVariantsAndPhonesLoading: false,
    createTextMessagesLoading: false,
    updateTextMessagesLoading: false,
    removeTextMessagesLoading: false,
    createVariantLoading: false,
    updateVariantLoading: false,
    removeVariantLoading: false,
    addPhoneLoading: false,
    removePhoneLoading: false,
    updatePhoneLoading: false,
  },
  errors: {
    fetchTextMessagesError: null,
    fetchVariantsAndPhonesError: null,
    createTextMessagesError: null,
    updateTextMessagesError: null,
    removeTextMessagesError: null,
    createVariantError: null,
    updateVariantError: null,
    removeVariantError: null,
    addPhoneError: null,
    removePhoneError: null,
    updatePhoneError: null,
  },
  cache: { textMessages: [] },
  filters: INITIAL_FILTERS,
};

/* eslint-disable default-case, no-param-reassign */
export const textMessagesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { payload } = action;

    switch (action.type) {
      case FETCH_TEXT_MESSAGES_REQUEST:
        draft.loaders.fetchTextMessagesLoading = true;
        draft.errors.fetchTextMessagesError = null;
        break;

      case FETCH_TEXT_MESSAGES_SUCCESS:
        const { textMessages, textMessagesSize } = action.payload;

        draft.loaders.fetchTextMessagesLoading = false;
        draft.textMessagesSize = textMessagesSize;
        draft.textMessages = sortTextMessagesByDate(textMessages);

        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case FETCH_TEXT_MESSAGES_ERROR:
        draft.loaders.fetchTextMessagesLoading = false;
        draft.errors.fetchTextMessagesError = action.payload.error;
        draft.reportsSize = 0;
        break;

      case FETCH_VARIANTS_AND_PHONES_REQUEST:
        draft.loaders.fetchVariantsAndPhonesLoading = true;
        draft.loaders.fetchVariantsAndPhonesLoadingError = null;
        break;

      case FETCH_VARIANTS_AND_PHONES_SUCCESS:
        const { variants, phones } = action.payload;
        draft.loaders.fetchVariantsAndPhonesLoading = false;

        if (variants.length) draft.selectedVariantId = variants[0].id;

        updateItemById(draft.textMessages, state.selectedMessageId, {
          variants,
          phones,
        });
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case FETCH_VARIANTS_AND_PHONES_ERROR:
        draft.loaders.fetchVariantsAndPhonesLoading = false;
        draft.errors.fetchVariantsAndPhonesLoadingError = action.payload.error;
        break;

      case CREATE_TEXT_MESSAGE_REQUEST: {
        const newTextMessage = action.payload.textMessage;
        draft.loaders.createTextMessagesLoading = true;

        draft.textMessages.push(newTextMessage);
        draft.textMessages = sortTextMessagesByDate(
          current(draft.textMessages),
        );
        break;
      }

      case CREATE_TEXT_MESSAGE_SUCCESS: {
        const { textMessage, textMessageId } = action.payload;
        draft.loaders.createTextMessagesLoading = false;
        draft.filters = INITIAL_FILTERS;

        updateItemById(draft.textMessages, textMessageId, textMessage);
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;
      }

      case CREATE_TEXT_MESSAGE_ERROR:
        assignDraftItems(draft.cache.textMessages, draft.textMessages);
        draft.errors.createTextMessagesError = action.payload.error;
        draft.loaders.createTextMessagesLoading = false;
        break;

      case CREATE_VARIANT_REQUEST:
        draft.loaders.createVariantLoading = true;
        break;

      case CREATE_VARIANT_SUCCESS: {
        const { variant } = action.payload;
        draft.selectedVariantId = variant.id;
        draft.loaders.createVariantLoading = false;

        updateItemById(draft.textMessages, state.selectedMessageId, (item) => {
          item.variants.push(variant);

          return item;
        });
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;
      }

      case CREATE_VARIANT_ERROR:
        draft.loaders.createVariantLoading = false;
        break;

      case CHANGE_SELECTED_MESSAGE:
        draft.selectedMessageId = action.payload.id;
        break;

      case CHANGE_SELECTED_VARIANT:
        draft.selectedVariantId = action.payload.id;
        break;

      case UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST:
        draft.loaders.updateTextMessagesLoading = true;
        const { data, type } = action.payload.value;

        updateItemById(draft.textMessages, state.selectedMessageId, (item) =>
          textMessageSettingsReducer(item, {
            data,
            type,
          }),
        );

        // `draft` used on purpose -> list with updated values is needed
        // Array copy converts `draft` Proxy Object to a simple Object
        draft.textMessages = sortTextMessagesByDate([...draft.textMessages]);

        break;

      case UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS:
        draft.loaders.updateTextMessagesLoading = false;
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;
      case UPDATE_TEXT_MESSAGE_SETTINGS_ERROR:
        draft.loaders.updateTextMessagesLoading = false;
        draft.errors.updateTextMessagesError = action.payload.error;

        assignDraftItems(draft.cache.textMessages, draft.textMessages);
        break;

      case REMOVE_TEXT_MESSAGE_REQUEST:
        draft.loaders.removeTextMessagesLoading = true;
        break;

      case REMOVE_TEXT_MESSAGE_SUCCESS:
        deleteItemById(draft.textMessages, state.selectedMessageId);
        assignDraftItems(draft.textMessages, draft.cache.textMessages);

        draft.loaders.removeTextMessagesLoading = false;
        draft.selectedMessageId = null;
        break;

      case REMOVE_TEXT_MESSAGE_ERROR:
        draft.loaders.removeTextMessagesLoading = false;
        draft.errors.removeTextMessagesError = action.payload.error;
        break;

      case UPDATE_TEXT_MESSAGE_VARIANT_REQUEST: {
        draft.loaders.updateVariantLoading = true;
        const {
          data: variantData,
          type: variantType,
          variantId,
        } = action.payload.value;

        updateItemById(
          draft.textMessages,
          state.selectedMessageId,
          (textMessage) => {
            updateItemById(textMessage.variants, variantId, (variant) =>
              textMessageVariantReducer(variant, {
                data: variantData,
                type: variantType,
                variantId,
              }),
            );

            return textMessage;
          },
        );
        break;
      }

      case UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS:
        draft.loaders.updateVariantLoading = false;
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case UPDATE_TEXT_MESSAGE_VARIANT_ERROR:
        draft.loaders.updateVariantLoading = false;
        draft.errors.updateVariantError = action.payload.error;

        assignDraftItems(draft.cache.textMessages, draft.textMessages);
        break;

      case REMOVE_TEXT_MESSAGE_VARIANT_REQUEST:
        draft.loaders.removeVariantLoading = true;
        updateItemById(
          draft.textMessages,
          state.selectedMessageId,
          (textMessage) => {
            deleteItemById(textMessage.variants, action.payload.variantId);

            return textMessage;
          },
        );
        break;

      case REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS:
        draft.loaders.removeVariantLoading = false;
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case REMOVE_TEXT_MESSAGE_VARIANT_ERROR:
        draft.loaders.removeVariantLoading = false;
        draft.errors.removeVariantError = action.payload.error;

        assignDraftItems(draft.cache.textMessages, draft.textMessages);
        break;

      case CLONE_TEXT_MESSAGE_REQUEST:
        draft.loaders.createTextMessagesLoading = true;
        break;

      case CLONE_TEXT_MESSAGE_SUCCESS:
        const { clonedTextMessage } = action.payload;
        draft.loaders.createTextMessagesLoading = false;

        draft.textMessages.push(clone(clonedTextMessage));
        draft.textMessages = sortTextMessagesByDate(
          current(draft.textMessages),
        );
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case CLONE_TEXT_MESSAGE_ERROR:
        draft.loaders.createTextMessagesLoading = false;
        break;

      case ADD_PHONE_REQUEST:
        draft.loaders.addPhoneLoading = true;
        draft.loaders.addPhoneError = null;
        break;

      case ADD_PHONE_SUCCESS:
        draft.loaders.addPhoneLoading = false;
        const { phone } = action.payload;

        updateItemById(
          draft.textMessages,
          state.selectedMessageId,
          (textMessage) => {
            textMessage.phones.push(phone);

            return textMessage;
          },
        );
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case ADD_PHONE_ERROR:
        draft.loaders.addPhoneLoading = false;
        draft.loaders.addPhoneError = action.payload.error;
        break;

      case REMOVE_PHONE_REQUEST:
        draft.loaders.removePhoneLoading = true;
        draft.loaders.removePhoneError = null;
        break;

      case REMOVE_PHONE_SUCCESS:
        draft.loaders.removePhoneLoading = false;

        updateItemById(
          draft.textMessages,
          state.selectedMessageId,
          (textMessage) => {
            deleteItemById(textMessage.phones, action.payload.phoneId);

            return textMessage;
          },
        );
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case REMOVE_PHONE_ERROR:
        draft.loaders.removePhoneLoading = false;
        draft.loaders.removePhoneError = action.payload.error;
        break;

      case UPDATE_PHONE_REQUEST:
        draft.loaders.updatePhoneLoading = true;
        draft.loaders.updatePhoneError = null;
        const { phoneId, phoneAttributes } = action.payload;

        updateItemById(
          draft.textMessages,
          state.selectedMessageId,
          (textMessage) => {
            updateItemById(textMessage.phones, phoneId, phoneAttributes);

            return textMessage;
          },
        );
        break;

      case UPDATE_PHONE_SUCCESS:
        draft.loaders.updatePhoneLoading = false;
        assignDraftItems(draft.textMessages, draft.cache.textMessages);
        break;

      case UPDATE_PHONE_ERROR:
        draft.loaders.updatePhoneLoading = false;
        draft.loaders.updatePhoneError = action.payload.error;
        assignDraftItems(draft.cache.textMessages, draft.textMessages);
        break;

      case SET_FILTERS:
        draft.filters = payload.filters;
        break;
    }
  });

export default textMessagesReducer;
