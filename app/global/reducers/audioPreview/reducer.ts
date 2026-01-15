import produce from 'immer';
import { AnyAction, Reducer } from 'redux';

import {
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_SUCCESS,
  RESET_PHONETIC_PREVIEW,
} from './constants';

type State = {
  phoneticText: Nullable<string>;
  phoneticUrl: Nullable<string>;
  phoneticLoading: boolean;
  previewKey: Nullable<string>;
};

export const initialState = {
  phoneticText: null,
  phoneticUrl: null,
  phoneticLoading: false,
  previewKey: null,
};

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
const AudioPreviewReducer: Reducer<State> = (
  state = initialState,
  { payload, type }: AnyAction,
) =>
  produce(state, (draft) => {
    switch (type) {
      case RESET_PHONETIC_PREVIEW:
        return initialState;
      case PHONETIC_PREVIEW_REQUEST:
        draft.phoneticText = payload;
        draft.phoneticLoading = true;
        draft.phoneticUrl = null;
        draft.previewKey = payload.previewKey;
        break;
      case PHONETIC_PREVIEW_SUCCESS:
        draft.phoneticUrl = payload.url;
        draft.phoneticLoading = false;
        break;
    }
  });

export { AudioPreviewReducer };
