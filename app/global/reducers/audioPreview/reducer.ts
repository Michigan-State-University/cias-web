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
};

export const initialState = {
  phoneticText: null,
  phoneticUrl: null,
  phoneticLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
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
        break;
      case PHONETIC_PREVIEW_SUCCESS:
        draft.phoneticUrl = payload.url;
        draft.phoneticLoading = false;
        break;
    }
  });

export { AudioPreviewReducer };
