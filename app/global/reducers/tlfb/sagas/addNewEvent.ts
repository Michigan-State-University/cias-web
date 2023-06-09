import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';
import { fullDayToYearFormatter } from 'utils/formatters';

import { EventData } from 'models/Tlfb';

import {
  addNewTlfbEventRequest,
  addNewTlfbEventError,
  addNewTlfbEventSuccess,
} from '../actions';

import { ADD_NEW_EVENT_REQUEST, ADD_NEW_EVENT_ERROR } from '../constants';
import messages from '../messages';

function* addNewEvent({
  payload: { userSessionId, dayKey, questionGroupId },
}: ReturnType<typeof addNewTlfbEventRequest>) {
  const url = `/v1/tlfb/events`;
  try {
    const date = dayjs(dayKey, fullDayToYearFormatter).utc(true);

    const { data } = yield call(axios.post, url, {
      exact_date: date.toISOString(),
      user_session_id: userSessionId,
      question_group_id: questionGroupId,
    });

    const newEvent = jsonApiToArray(data, 'event') as EventData[];
    yield put(addNewTlfbEventSuccess(dayKey, newEvent));
  } catch (error) {
    // @ts-ignore
    yield call(toast.error, formatMessage(messages.addTlfbEventError), {
      id: ADD_NEW_EVENT_ERROR,
    });
    yield put(addNewTlfbEventError());
  }
}

export function* addNewEventSaga() {
  yield takeLatest(ADD_NEW_EVENT_REQUEST, addNewEvent);
}
