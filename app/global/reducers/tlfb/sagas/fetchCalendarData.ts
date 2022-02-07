import axios from 'axios';
import { call, takeLatest, put } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { DayData } from 'models/Tlfb';
import { FETCH_CALENDAR_DATA_REQUEST } from '../constants';
import {
  fetchCalendarDataRequest,
  fetchCalendarDataSuccess,
  fetchCalendarDataError,
} from '../actions';

function* fetchCalendarData({
  payload: { userSessionId, questionGroupId },
}: ReturnType<typeof fetchCalendarDataRequest>) {
  const url = `/v1/calendar_data?user_session_id=${userSessionId}&tlfb_group_id=${questionGroupId}`;
  try {
    const { data } = yield call(axios.get, url);
    const days = jsonApiToArray(data, 'day');
    const mappedDays = days.reduce(
      (obj: Record<string, DayData>, { date, events, substances }: any) => ({
        ...obj,
        [date]: {
          events,
          substance: substances[0],
        },
      }),
      {},
    );
    yield put(fetchCalendarDataSuccess(mappedDays));
  } catch (error) {
    yield put(fetchCalendarDataError());
  }
}

export function* fetchCalendarDataSaga() {
  yield takeLatest(FETCH_CALENDAR_DATA_REQUEST, fetchCalendarData);
}
