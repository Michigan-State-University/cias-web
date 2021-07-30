import produce from 'immer';
import {
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_SUCCESS,
  RESET_PHONETIC_PREVIEW,
} from './constants';

export const initialState = {
  phoneticText: null,
  phoneticUrl: null,
  phoneticLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const AudioPreviewReducer = (state = initialState, { payload, type }) =>
  produce(state, (draft) => {
    switch (type) {
      case RESET_PHONETIC_PREVIEW:
        return initialState;
      case PHONETIC_PREVIEW_REQUEST:
        draft.phoneticText = payload;
        draft.phoneticLoading = true;
        draft.phoneticUrl = null;
        break;
      case PHONETIC_PREVIEW_SUCCESS:
        draft.phoneticUrl = payload.url;
        draft.phoneticLoading = false;
        break;
    }
  });

export { AudioPreviewReducer };
