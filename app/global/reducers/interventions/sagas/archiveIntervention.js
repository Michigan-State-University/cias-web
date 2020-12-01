import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { toArchive } from 'models/Status/StatusTypes';

import {
  archiveInterventionFailure,
  archiveInterventionSuccess,
} from '../actions';
import { ARCHIVE_PROBLEM_REQUEST, ARCHIVE_PROBLEM_ERROR } from '../constants';

export function* archiveIntervention({ payload: { interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}`;
  try {
    const {
      data: { data },
    } = yield call(axios.patch, requestURL, {
      intervention: { status_event: toArchive },
    });
    const mappedData = defaultMapper(data);

    yield put(archiveInterventionSuccess(mappedData));
  } catch (error) {
    yield put(archiveInterventionFailure(interventionId));
    yield call(
      toast.error,
      formatMessage(globalMessages.archiveInterventionError),
      {
        toastId: ARCHIVE_PROBLEM_ERROR,
      },
    );
  }
}
export default function* archiveInterventionSaga() {
  yield takeLatest(ARCHIVE_PROBLEM_REQUEST, archiveIntervention);
}
