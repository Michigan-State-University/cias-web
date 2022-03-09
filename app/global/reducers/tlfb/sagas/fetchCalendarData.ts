import axios from 'axios';
import { call, takeLatest, put } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_CALENDAR_DATA_REQUEST } from '../constants';
import {
  fetchCalendarDataRequest,
  fetchCalendarDataSuccess,
  fetchCalendarDataError,
} from '../actions';
import { CalendarDataResponseItem } from '../types';
import { mapCalendarDataResponse } from '../utils';

function* fetchCalendarData({
  payload: { userSessionId, questionGroupId },
}: ReturnType<typeof fetchCalendarDataRequest>) {
  const url = `/v1/calendar_data`;

  const params = {
    user_session_id: userSessionId,
    tlfb_group_id: questionGroupId,
  };
  try {
    const { data } = yield call(axios.get, url, { params });
    const days: CalendarDataResponseItem[] = jsonApiToArray(data, 'day');
    const mappedDays = mapCalendarDataResponse(days);
    yield put(fetchCalendarDataSuccess(mappedDays));
  } catch (error) {
    yield put(fetchCalendarDataError());
  }
}

export function* fetchCalendarDataSaga() {
  yield takeLatest(FETCH_CALENDAR_DATA_REQUEST, fetchCalendarData);
}
