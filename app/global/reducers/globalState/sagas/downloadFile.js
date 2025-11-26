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

const isApiUrl = (url) => {
  const apiUrl = process.env.API_URL;
  return (
    url.startsWith(apiUrl) || url.startsWith('/v1/') || url.startsWith('/api/')
  );
};

function* downloadFromExternalUrl(url) {
  const response = yield call(fetch, url, {
    method: 'GET',
    credentials: 'omit',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = yield call([response, 'blob']);
  return blob;
}

export function* downloadFile({ payload: { fileUrl, fileName } }) {
  const cachedFile = yield select(makeSelectFile(fileUrl));

  try {
    let data;

    if (cachedFile) data = cachedFile;
    else if (isApiUrl(fileUrl)) {
      const requestConfig = {
        responseType: 'blob',
        maxRedirects: 0,
        validateStatus: (status) =>
          status === 302 || (status >= 200 && status < 300),
      };

      try {
        const response = yield call(axios.get, fileUrl, requestConfig);
        data = response.data;
      } catch (error) {
        if (error.response && error.response.status === 302) {
          const s3Url = error.response.headers.location;
          if (s3Url) {
            data = yield call(downloadFromExternalUrl, s3Url);
          } else {
            throw new Error('No redirect location provided');
          }
        } else {
          throw error;
        }
      }
    } else {
      data = yield call(downloadFromExternalUrl, fileUrl);
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
