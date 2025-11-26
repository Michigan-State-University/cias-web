import axios from 'axios';
import { put, takeLatest, call, select, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';

import { formatMessage } from 'utils/intlOutsideReact';
import { getFileNameFromUrl } from 'utils/getFileNameFromUrl';

import { DOWNLOAD_FILE_REQUEST, DOWNLOAD_FILE_ERROR } from '../constants';
import { downloadFileSuccess, downloadFileError } from '../actions';
import messages from '../messages';
import { makeSelectFile } from '../selectors';

const axiosWithoutCredentials = axios.create({
  withCredentials: false,
});

const isApiUrl = (url) => {
  const apiUrl = process.env.API_URL;
  return (
    url.startsWith(apiUrl) || url.startsWith('/v1/') || url.startsWith('/api/')
  );
};

export function* downloadFile({ payload: { fileUrl, fileName } }) {
  const cachedFile = yield select(makeSelectFile(fileUrl));

  try {
    let data;

    if (cachedFile) data = cachedFile;
    else {
      const requestConfig = {
        responseType: 'blob',
      };

      const axiosInstance = isApiUrl(fileUrl) ? axios : axiosWithoutCredentials;

      ({ data } = yield call(axiosInstance.get, fileUrl, requestConfig));
    }

    fileDownload(
      data,
      fileName ??
        getFileNameFromUrl(fileUrl) ??
        formatMessage(messages.defaultFileName),
    );

    yield delay(1000);
    yield put(downloadFileSuccess(data, fileUrl));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.downloadFileError), {
      toastId: DOWNLOAD_FILE_ERROR,
    });
    yield put(downloadFileError(error));
  }
}

export default function* downloadFileSaga() {
  yield takeLatest(DOWNLOAD_FILE_REQUEST, downloadFile);
}
