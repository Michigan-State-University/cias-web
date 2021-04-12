import produce from 'immer';
import {
  FETCH_LANGUAGES_ERROR,
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGE_VOICES_ERROR,
  FETCH_LANGUAGE_VOICES_REQUEST,
  FETCH_LANGUAGE_VOICES_SUCCESS,
} from './constants';

export const initialState = {
  languages: {
    data: null,
    loading: false,
    error: null,
  },
  voices: {},
};

/* eslint-disable default-case, no-param-reassign */
const ttsLanguageReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_LANGUAGES_REQUEST:
        draft.languages.loading = true;
        draft.languages.error = null;
        draft.languages.data = null;
        break;

      case FETCH_LANGUAGES_SUCCESS:
        draft.languages.loading = false;
        draft.languages.data = payload.languages;
        break;

      case FETCH_LANGUAGES_ERROR:
        draft.languages.loading = false;
        break;

      case FETCH_LANGUAGE_VOICES_REQUEST:
        draft.voices[payload.id] = {
          loading: true,
          data: null,
        };
        break;

      case FETCH_LANGUAGE_VOICES_SUCCESS:
        draft.voices[payload.id] = {
          loading: false,
          data: payload.voices,
        };
        break;

      case FETCH_LANGUAGE_VOICES_ERROR:
        draft.voices[payload.id] = {
          loading: false,
        };
        break;
    }
  });

export { ttsLanguageReducer };
