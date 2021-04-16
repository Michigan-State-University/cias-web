import { createSelector } from 'reselect';
import { initialState } from './reducer';

const audioPreview = state => state.audioPreview || initialState;

export const makeSelectAudioPreviewState = () =>
  createSelector(
    audioPreview,
    substate => substate,
  );
