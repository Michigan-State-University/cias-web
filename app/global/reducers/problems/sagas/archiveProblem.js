import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { toArchive } from 'models/Status/StatusTypes';

import { archiveProblemFailure, archiveProblemSuccess } from '../actions';
import { ARCHIVE_PROBLEM_REQUEST, ARCHIVE_PROBLEM_ERROR } from '../constants';

function* archiveProblem({ payload: { problemId } }) {
  const requestURL = `v1/problems/${problemId}`;
  try {
    const {
      data: { data },
    } = yield axios.patch(requestURL, {
      problem: { status_event: toArchive },
    });
    const mappedData = defaultMapper(data);

    yield put(archiveProblemSuccess(mappedData));
  } catch (error) {
    yield put(archiveProblemFailure(problemId));
    yield put(
      showError(formatMessage(globalMessages.archiveProblemError), {
        id: ARCHIVE_PROBLEM_ERROR,
      }),
    );
  }
}
export default function* archiveProblemSaga() {
  yield takeLatest(ARCHIVE_PROBLEM_REQUEST, archiveProblem);
}
