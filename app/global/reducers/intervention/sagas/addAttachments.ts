import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { ADD_INTERVENTION_ATTACHMENTS_REQUEST } from '../constants';
import messages from '../messages';
import {
  addAttachmentSuccess,
  addAttachmentRequest,
  addAttachmentError,
} from '../actions';

export function* addInterventionAttachments({
  payload: { interventionId, attachments },
}: ReturnType<typeof addAttachmentRequest>) {
  const requestURL = `v1/interventions/${interventionId}/files`;

  const formData = new FormData();
  attachments.forEach((attachment: File) =>
    formData.append(`intervention[files][]`, attachment),
  );

  const headers = { 'Content-Type': 'multipart/form-data' };

  try {
    const { data } = yield call(axios.post, requestURL, formData, { headers });
    yield call(toast.success, formatMessage(messages.addAttachmentSuccess));

    const mappedIntervention = jsonApiToObject(data, 'intervention');
    yield put(addAttachmentSuccess(mappedIntervention));
  } catch (error) {
    yield put(addAttachmentError(error));
    yield call(toast.error, formatMessage(messages.addAttachmentError));
  }
}

export default function* addInterventionAttachmentsSaga() {
  yield takeLatest(
    ADD_INTERVENTION_ATTACHMENTS_REQUEST,
    addInterventionAttachments,
  );
}
