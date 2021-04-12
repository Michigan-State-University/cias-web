import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_LANGUAGES_ERROR,
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGE_VOICES_ERROR,
  FETCH_LANGUAGE_VOICES_REQUEST,
  FETCH_LANGUAGE_VOICES_SUCCESS,
} from './constants';

export const fetchLanguagesRequest = () =>
  actionBuilder(FETCH_LANGUAGES_REQUEST, {});

export const fetchLanguagesSuccess = languages =>
  actionBuilder(FETCH_LANGUAGES_SUCCESS, { languages });

export const fetchLanguagesError = () =>
  actionBuilder(FETCH_LANGUAGES_ERROR, {});

export const fetchLanguageVoiceRequest = id =>
  actionBuilder(FETCH_LANGUAGE_VOICES_REQUEST, { id });

export const fetchLanguageVoiceSuccess = (id, voices) =>
  actionBuilder(FETCH_LANGUAGE_VOICES_SUCCESS, { id, voices });

export const fetchLanguageVoiceError = id =>
  actionBuilder(FETCH_LANGUAGE_VOICES_ERROR, { id });
