/* eslint-disable no-unused-vars, default-case, no-param-reassign */
/*
 *
 * fileDownload reducer
 *
 */
import produce from 'immer';

import {
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
} from './constants';

export const initialState = {
  cachedFiles: {},
  isLoading: false,
  error: null,
};

export const fileDownloadReducer = ({ payload, type }, state = initialState) =>
  produce(state, (draft) => {
    switch (type) {
      case DOWNLOAD_FILE_REQUEST:
        draft.isLoading = true;
        draft.error = null;

        break;

      case DOWNLOAD_FILE_SUCCESS:
        draft.isLoading = false;
        draft.error = null;

        draft.cachedFiles[payload.fileUrl] = payload.fileBlob;

        break;

      case DOWNLOAD_FILE_ERROR:
        draft.isLoading = false;
        draft.error = payload.error;

        break;

      default:
        break;
    }
  });
