import { put, takeLatest, call, select, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';

import { formatMessage } from 'utils/intlOutsideReact';
import { getFileNameFromUrl } from 'utils/getFileNameFromUrl';
import LocalStorageService from 'utils/localStorageService';

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

function* downloadFromApi(url) {
  const headers = LocalStorageService.getHeaders();

  const response = yield call(fetch, url, {
    method: 'GET',
    credentials: 'include',
    redirect: 'manual',
    headers: {
      'Access-Token': headers['Access-Token'],
      Client: headers.Client,
      Uid: headers.Uid,
    },
  });

  if (response.type === 'opaqueredirect' || response.status === 0) {
    throw new Error(
      'Cannot manually handle redirect - browser security restriction',
    );
  }

  if (
    response.status === 302 ||
    response.status === 301 ||
    response.status === 307
  ) {
    const s3Url = response.headers.get('Location');
    if (s3Url) {
      return yield call(downloadFromExternalUrl, s3Url);
    }
    throw new Error('No redirect location provided');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = yield call([response, 'blob']);
  return blob;
}

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
      data = yield call(downloadFromApi, fileUrl);
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
