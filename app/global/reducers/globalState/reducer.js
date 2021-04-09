/* eslint-disable no-unused-vars, default-case, no-param-reassign */
/*
 *
 * global reducer
 *
 */
import produce from 'immer';
import AudioWrapper from 'utils/audioWrapper';

import {
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
} from './constants';

import {
  fileDownloadReducer,
  initialState as fileDownloadReducerInitialState,
} from './fileDownloadReducer';

export const initialState = {
  audioInstance: new AudioWrapper(),
  fileDownload: fileDownloadReducerInitialState,
};

export const globalStateReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case DOWNLOAD_FILE_REQUEST:
      case DOWNLOAD_FILE_SUCCESS:
      case DOWNLOAD_FILE_ERROR:
        draft.fileDownload = fileDownloadReducer(state.fileDownload, {
          payload,
          type,
        });
        break;

      default:
        break;
    }
  });
