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

export function* downloadFile({ payload: { fileUrl, fileName } }) {
  const cachedFile = yield select(makeSelectFile(fileUrl));

  try {
    let data;

    if (cachedFile) data = cachedFile;
    else {
      // Follow redirects within API (same origin) with credentials
      // But stop before the final redirect to S3
      let currentUrl = fileUrl;
      let redirectCount = 0;
      const MAX_REDIRECTS = 5;

      while (redirectCount < MAX_REDIRECTS) {
        const response = yield call(axios.get, currentUrl, {
          maxRedirects: 0,
          validateStatus: (status) => status === 302 || status === 200,
        });

        if (response.status === 200) {
          // Got the actual file data
          data = response.data;
          break;
        }

        if (response.status === 302) {
          const redirectUrl = response.headers.location;

          // Check if redirect is to S3 (external domain)
          const isS3Redirect =
            redirectUrl.includes('amazonaws.com') ||
            (!redirectUrl.startsWith('/') && !redirectUrl.includes('cias-api'));

          if (isS3Redirect) {
            // Final redirect to S3 - fetch without credentials
            const axiosInstance = axios.create({
              baseURL: undefined,
              withCredentials: false,
            });

            ({ data } = yield call(axiosInstance.get, redirectUrl, {
              responseType: 'blob',
            }));
            break;
          }
          // Internal API redirect - continue with credentials
          // Handle relative URLs
          currentUrl = redirectUrl.startsWith('http')
            ? redirectUrl
            : `${window.location.origin}${redirectUrl}`;
          redirectCount += 1;
        }
      }

      if (!data) {
        throw new Error('Max redirects reached or no data received');
      }
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
