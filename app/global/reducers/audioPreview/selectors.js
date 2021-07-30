import { createSelector } from 'reselect';
import { initialState } from './reducer.ts';

const audioPreview = (state) => state.audioPreview || initialState;

export const makeSelectAudioPreviewState = () =>
  createSelector(audioPreview, (substate) => substate);
