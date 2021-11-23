import produce from 'immer';
import remove from 'lodash/remove';
import clone from 'lodash/cloneDeep';

import { sortTextMessagesByDate } from 'models/TextMessage/utils';

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
  cache: {},
  filters: INITIAL_FILTERS,
};

/* eslint-disable default-case, no-param-reassign */
export const textMessagesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const selectedMessageIndex = () =>
      state.textMessages.findIndex(({ id }) => id === state.selectedMessageId);
    let textMessageIndex;

    const { payload } = action;
    switch (action.type) {
      case FETCH_TEXT_MESSAGES_REQUEST:
        draft.loaders.fetchTextMessagesLoading = true;
        draft.errors.fetchTextMessagesError = null;
        break;

      case FETCH_TEXT_MESSAGES_SUCCESS:
        const { textMessages, textMessagesSize } = action.payload;
        draft.loaders.fetchTextMessagesLoading = false;

        const sortedTextMessages = sortTextMessagesByDate(textMessages);

        draft.textMessages = sortedTextMessages;
        draft.cache.textMessages = sortedTextMessages;
        draft.textMessagesSize = textMessagesSize;
        break;

      case FETCH_TEXT_MESSAGES_ERROR:
        draft.loaders.fetchTextMessagesLoading = false;
        draft.errors.fetchTextMessagesError = action.payload.error;
        draft.reportsSize = 0;
        draft.textMessages = state.cache.textMessages;
        break;

      case FETCH_VARIANTS_AND_PHONES_REQUEST:
        draft.loaders.fetchVariantsAndPhonesLoading = true;
        draft.loaders.fetchVariantsAndPhonesLoadingError = null;
        break;

      case FETCH_VARIANTS_AND_PHONES_SUCCESS:
        const { variants, phones } = action.payload;
        draft.loaders.fetchVariantsAndPhonesLoading = false;
        textMessageIndex = selectedMessageIndex();

        if (textMessageIndex > -1) {
          draft.textMessages[textMessageIndex] = {
            ...draft.textMessages[textMessageIndex],
            variants,
            phones,
          };

          draft.cache.textMessages = draft.textMessages;
        }
        if (variants.length) draft.selectedVariantId = variants[0].id;
        break;

      case FETCH_VARIANTS_AND_PHONES_ERROR:
        draft.loaders.fetchVariantsAndPhonesLoading = false;
        draft.textMessages = state.cache.textMessages;
        draft.errors.fetchVariantsAndPhonesLoadingError = action.payload.error;
        break;

      case CREATE_TEXT_MESSAGE_REQUEST:
        const newTextMessage = action.payload.textMessage;
        draft.textMessages = sortTextMessagesByDate([
          ...state.textMessages,
          newTextMessage,
        ]);
        draft.loaders.createTextMessagesLoading = true;
        break;

      case CREATE_TEXT_MESSAGE_SUCCESS: {
        const { textMessage, textMessageId } = action.payload;
        draft.cache.textMessages = state.textMessages;
        draft.loaders.createTextMessagesLoading = false;
        textMessageIndex = state.textMessages.findIndex(
          ({ id }) => id === textMessageId,
        );
        draft.textMessages[textMessageIndex] = textMessage;
        draft.filters = INITIAL_FILTERS;
        break;
      }

      case CREATE_TEXT_MESSAGE_ERROR:
        draft.textMessages = state.cache.textMessages;
        draft.errors.createTextMessagesError = action.payload.error;
        draft.loaders.createTextMessagesLoading = false;
        break;

      case CREATE_VARIANT_REQUEST:
        draft.loaders.createVariantLoading = true;
        break;

      case CREATE_VARIANT_SUCCESS:
        const { variant } = action.payload;
        textMessageIndex = state.textMessages.findIndex(
          ({ id }) => id === state.selectedMessageId,
        );
        draft.cache.textMessages = state.textMessages;
        draft.textMessages[textMessageIndex] = {
          ...state.textMessages[textMessageIndex],
          variants: [...state.textMessages[textMessageIndex].variants, variant],
        };
        draft.selectedVariantId = variant.id;
        draft.loaders.createVariantLoading = false;
        break;

      case CREATE_VARIANT_ERROR:
        draft.loaders.createVariantLoading = false;
        draft.textMessages = state.cache.textMessages;
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
        const editedTextMessageIndex = selectedMessageIndex();

        draft.textMessages[editedTextMessageIndex] = textMessageSettingsReducer(
          state.textMessages[editedTextMessageIndex],
          {
            data,
            type,
          },
        );

        // `draft` used on purpose -> list with updated values is needed
        // Array copy converts `draft` Proxy Object to a simple Object
        draft.textMessages = sortTextMessagesByDate([...draft.textMessages]);

        break;

      case UPDATE_TEXT_MESSAGE_SETTINGS_SUCCESS:
        draft.loaders.updateTextMessagesLoading = false;
        draft.cache.textMessages = state.textMessages;
        break;
      case UPDATE_TEXT_MESSAGE_SETTINGS_ERROR:
        draft.loaders.updateTextMessagesLoading = false;
        draft.textMessages = state.cache.textMessages;
        draft.errors.updateTextMessagesError = action.payload.error;
        break;

      case REMOVE_TEXT_MESSAGE_REQUEST:
        draft.loaders.removeTextMessagesLoading = true;
        break;
      case REMOVE_TEXT_MESSAGE_SUCCESS:
        draft.loaders.removeTextMessagesLoading = false;
        draft.cache.textMessages = state.textMessages;
        const currentState = clone(state.textMessages);
        remove(currentState, ({ id }) => id === state.selectedMessageId);
        draft.textMessages = currentState;
        draft.selectedMessageId = null;
        break;
      case REMOVE_TEXT_MESSAGE_ERROR:
        draft.loaders.removeTextMessagesLoading = false;
        draft.textMessages = state.cache.textMessages;
        draft.errors.removeTextMessagesError = action.payload.error;
        break;

      case UPDATE_TEXT_MESSAGE_VARIANT_REQUEST:
        draft.loaders.updateVariantLoading = true;
        const {
          data: variantData,
          type: variantType,
          variantId,
        } = action.payload.value;
        textMessageIndex = selectedMessageIndex();
        const variantIndex = state.textMessages[
          textMessageIndex
        ].variants.findIndex(({ id }) => id === variantId);

        draft.textMessages[textMessageIndex].variants[variantIndex] =
          textMessageVariantReducer(
            state.textMessages[textMessageIndex].variants[variantIndex],
            {
              data: variantData,
              type: variantType,
              variantId,
            },
          );
        break;
      case UPDATE_TEXT_MESSAGE_VARIANT_SUCCESS:
        draft.loaders.updateVariantLoading = false;
        draft.cache.textMessages = state.textMessages;
        break;
      case UPDATE_TEXT_MESSAGE_VARIANT_ERROR:
        draft.loaders.updateVariantLoading = false;
        draft.textMessages = state.cache.textMessages;
        draft.errors.updateVariantError = action.payload.error;
        break;

      case REMOVE_TEXT_MESSAGE_VARIANT_REQUEST:
        draft.loaders.removeVariantLoading = true;
        textMessageIndex = selectedMessageIndex();
        const currentVariantsState = clone(
          state.textMessages[textMessageIndex].variants,
        );
        remove(
          currentVariantsState,
          ({ id }) => id === action.payload.variantId,
        );
        draft.textMessages[textMessageIndex].variants = currentVariantsState;
        break;
      case REMOVE_TEXT_MESSAGE_VARIANT_SUCCESS:
        draft.loaders.removeVariantLoading = false;
        draft.cache.textMessages = state.textMessages;
        break;
      case REMOVE_TEXT_MESSAGE_VARIANT_ERROR:
        draft.loaders.removeVariantLoading = false;
        draft.textMessages = state.cache.textMessages;
        draft.errors.removeVariantError = action.payload.error;
        break;

      case CLONE_TEXT_MESSAGE_REQUEST:
        draft.loaders.createTextMessagesLoading = true;
        break;

      case CLONE_TEXT_MESSAGE_SUCCESS:
        const { clonedTextMessage } = action.payload;
        draft.textMessages = sortTextMessagesByDate([
          ...state.textMessages,
          clonedTextMessage,
        ]);
        draft.loaders.createTextMessagesLoading = false;
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
        textMessageIndex = selectedMessageIndex();
        if (textMessageIndex === -1) break;
        draft.textMessages[textMessageIndex].phones = [
          ...draft.textMessages[textMessageIndex].phones,
          phone,
        ];
        break;
      case ADD_PHONE_ERROR:
        draft.loaders.addPhoneLoading = false;
        draft.loaders.addPhonerError = action.payload.error;
        break;

      case REMOVE_PHONE_REQUEST:
        draft.loaders.removePhoneLoading = true;
        draft.loaders.removePhoneError = null;
        break;
      case REMOVE_PHONE_SUCCESS:
        draft.loaders.removePhoneLoading = false;
        textMessageIndex = selectedMessageIndex();
        if (textMessageIndex === -1) break;
        draft.textMessages[textMessageIndex].phones = draft.textMessages[
          textMessageIndex
        ].phones.filter(({ id }) => id !== action.payload.phoneId);
        break;
      case REMOVE_PHONE_ERROR:
        draft.loaders.removePhoneLoading = false;
        draft.loaders.removePhoneError = action.payload.error;
        break;

      case UPDATE_PHONE_REQUEST:
        draft.loaders.updatePhoneLoading = true;
        draft.loaders.updatePhoneError = null;
        textMessageIndex = selectedMessageIndex();
        if (textMessageIndex === -1) break;
        const { phoneId, phoneAttributes } = action.payload;
        const phoneIndex = draft.textMessages[
          textMessageIndex
        ].phones?.findIndex(({ id }) => id === phoneId);
        if (phoneIndex > -1) {
          draft.textMessages[textMessageIndex].phones[phoneIndex] = {
            ...draft.textMessages[textMessageIndex].phones[phoneIndex],
            ...phoneAttributes,
          };
        }
        break;
      case UPDATE_PHONE_SUCCESS:
        draft.loaders.updatePhoneLoading = false;
        draft.cache.textMessages = draft.textMessages;
        break;
      case UPDATE_PHONE_ERROR:
        draft.loaders.updatePhoneLoading = false;
        draft.loaders.updatePhoneError = action.payload.error;
        break;

      case SET_FILTERS:
        draft.filters = payload.filters;
        break;
    }
  });

export default textMessagesReducer;
