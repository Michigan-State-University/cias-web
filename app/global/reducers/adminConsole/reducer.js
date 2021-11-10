import produce from 'immer';

import {
  RESET_AUDIO_ERROR,
  RESET_AUDIO_REQUEST,
  RESET_AUDIO_SUCCESS,
} from './constants';

export const initialState = {
  loaders: {
    resetAudio: false,
  },
  errors: {
    resetAudio: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminConsoleReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case RESET_AUDIO_REQUEST:
        draft.loaders.resetAudio = true;
        draft.errors.resetAudio = null;
        break;

      case RESET_AUDIO_SUCCESS:
        draft.loaders.resetAudio = false;
        break;

      case RESET_AUDIO_ERROR:
        const { error } = payload;

        draft.loaders.resetAudio = false;
        draft.errors.resetAudio = error;
        break;
    }
  });

export { adminConsoleReducer };
