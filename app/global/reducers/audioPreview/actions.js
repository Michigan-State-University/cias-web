import { actionBuilder } from 'utils/actionBuilder';
import {
  PHONETIC_PREVIEW_REQUEST,
  PHONETIC_PREVIEW_SUCCESS,
  RESET_PHONETIC_PREVIEW,
} from './constants';

export const resetPhoneticPreview = () =>
  actionBuilder(RESET_PHONETIC_PREVIEW, {});

export const phoneticPreviewRequest = (text, options, previewKey) =>
  actionBuilder(PHONETIC_PREVIEW_REQUEST, { text, options, previewKey });

export const phoneticPreviewSuccess = (url) =>
  actionBuilder(PHONETIC_PREVIEW_SUCCESS, { url });
