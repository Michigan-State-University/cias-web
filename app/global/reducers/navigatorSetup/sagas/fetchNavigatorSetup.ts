import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';

import { FETCH_NAVIGATOR_SETUP_REQUEST } from '../constants';
import {
  fetchNavigatorSetupError,
  fetchNavigatorSetupRequest,
  fetchNavigatorSetupSuccess,
} from '../actions';

export function* fetchNavigatorSetup({
  payload: { interventionId },
}: ReturnType<typeof fetchNavigatorSetupRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;
  try {
    const { data } = yield call(axios.get, url);
    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;
    yield put(fetchNavigatorSetupSuccess(navigatorSetup));
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
