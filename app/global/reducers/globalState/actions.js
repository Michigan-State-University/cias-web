import { actionBuilder } from 'utils/actionBuilder';
import {
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
} from 'global/reducers/globalState/constants';

export const downloadFileRequest = (fileUrl, fileName) =>
  actionBuilder(DOWNLOAD_FILE_REQUEST, { fileUrl, fileName });

export const downloadFileSuccess = (fileBlob, fileUrl) =>
  actionBuilder(DOWNLOAD_FILE_SUCCESS, { fileBlob, fileUrl });

export const downloadFileError = (error) =>
  actionBuilder(DOWNLOAD_FILE_ERROR, { error });
