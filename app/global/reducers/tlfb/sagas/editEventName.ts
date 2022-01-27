import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { EDIT_EVENT_NAME_REQUEST, EDIT_EVENT_NAME_ERROR } from '../constants';
import { editEventName, editEventNameError } from '../actions';
import messages from '../messages';

function* editTlfbEventName({
  payload: { eventId, name, dayKey },
}: ReturnType<typeof editEventName>) {
  const url = `/v1/tlfb/events/${eventId}`;
  try {
    yield call(axios.patch, url, {
      name,
    });
  } catch (error) {
    // @ts-ignore
    yield call(toast.error, formatMessage(messages.editTlfbEventError), {
      id: EDIT_EVENT_NAME_ERROR,
    });
    yield put(editEventNameError(dayKey));
  }
}

export function* editTlfbEventNameSaga() {
  yield takeLatest(EDIT_EVENT_NAME_REQUEST, editTlfbEventName);
}
