/* eslint-disable no-unused-vars, default-case, no-param-reassign */
/*
 *
 * global reducer
 *
 */
import produce from 'immer';
import AudioWrapper from 'utils/audioWrapper';

export const initialState = {
  audioInstance: new AudioWrapper(),
};

export const globalStateReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {});
