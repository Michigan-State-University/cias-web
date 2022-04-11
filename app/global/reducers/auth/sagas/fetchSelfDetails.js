import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import noop from 'lodash/noop';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { pickUserAttributes } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';
import { FETCH_SELF_DETAILS_REQUEST } from '../constants';
import { editUserSuccess } from '../actions';

export function* fetchSelfDetails() {
  const requestUrl = 'v1/me';
  try {
    const { data } = yield call(axios.get, requestUrl);
    const editedUser = jsonApiToObject(data, 'user');
    const pickedUser = pickUserAttributes(editedUser);
    yield call(LocalStorageService.updateState, { user: pickedUser });
    yield put(editUserSuccess(pickedUser));
  } catch {
    noop();
  }
}

export default function* fetchSelfDetailsSaga() {
  yield takeLatest(FETCH_SELF_DETAILS_REQUEST, fetchSelfDetails);
}
