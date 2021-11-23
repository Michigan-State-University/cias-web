import axios from 'axios';
import { call, put } from 'redux-saga-test-plan/matchers';
import { takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { deleteAttachmentRequest, deleteAttachmentSuccess } from '../actions';
import messages from '../messages';
import { DELETE_INTERVENTION_ATTACHMENT_REQUEST } from '../constants';

export function* deleteInterventionAttachment({
  payload: { interventionId, attachmentId },
}: ReturnType<typeof deleteAttachmentRequest>) {
  const requestURL = `v1/interventions/${interventionId}/files/${attachmentId}`;

  try {
    const { data } = yield call(axios.delete, requestURL);
    yield call(toast.success, formatMessage(messages.deleteAttachmentSuccess));

    const mappedIntervention = jsonApiToObject(data, 'intervention');
    yield put(deleteAttachmentSuccess(mappedIntervention));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteAttachmentError));
  }
}

export default function* deleteInterventionAttachmentSaga() {
  yield takeLatest(
    DELETE_INTERVENTION_ATTACHMENT_REQUEST,
    deleteInterventionAttachment,
  );
}
