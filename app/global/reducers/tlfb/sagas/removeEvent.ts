import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { DELETE_EVENT_REQUEST, DELETE_EVENT_ERROR } from '../constants';
import { deleteEventError, deleteEventRequest } from '../actions';
import messages from '../messages';

function* removeTlfbEvent({
  payload: { eventId, dayKey },
}: ReturnType<typeof deleteEventRequest>) {
  const url = `/v1/tlfb/events/${eventId}`;
  try {
    yield call(axios.delete, url);
  } catch (error) {
    // @ts-ignore
    yield call(toast.error, formatMessage(messages.deleteTlfbEventError), {
      id: DELETE_EVENT_ERROR,
    });
    yield put(deleteEventError(dayKey));
  }
}

export function* removeTlfbEventSaga() {
  yield takeLatest(DELETE_EVENT_REQUEST, removeTlfbEvent);
}
