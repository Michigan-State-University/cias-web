import { actionBuilder } from 'utils/actionBuilder';

import {
  RESET_AUDIO_ERROR,
  RESET_AUDIO_REQUEST,
  RESET_AUDIO_SUCCESS,
} from './constants';

export const resetAudioRequest = () => actionBuilder(RESET_AUDIO_REQUEST, {});
export const resetAudioSuccess = () => actionBuilder(RESET_AUDIO_SUCCESS, {});
export const resetAudioError = error =>
  actionBuilder(RESET_AUDIO_ERROR, { error });
