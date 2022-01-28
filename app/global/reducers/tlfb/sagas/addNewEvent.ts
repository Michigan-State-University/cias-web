import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { fullDayToYearFormatter } from 'utils/formatters';
import { EventData } from 'models/Tlfb';

import { ADD_NEW_EVENT } from '../constants';
import {
  addNewTlfbEvent,
  addNewTlfbEventError,
  addNewTlfbEventSuccess,
} from '../actions';

function* addNewEvent({
  payload: { userSessionId, isoDay, questionGroupId },
}: ReturnType<typeof addNewTlfbEvent>) {
  const url = `/v1/tlfb/events`;
  try {
    const { data } = yield call(axios.post, url, {
      exact_date: isoDay,
      user_session_id: userSessionId,
      question_group_id: questionGroupId,
    });

    const newEvent = jsonApiToArray(data, 'event') as EventData[];
    const date = dayjs(isoDay).format(fullDayToYearFormatter);
    yield put(addNewTlfbEventSuccess(date, newEvent));
  } catch (error) {
    yield put(addNewTlfbEventError());
  }
}

export function* addNewEventSaga() {
  yield takeLatest(ADD_NEW_EVENT, addNewEvent);
}
