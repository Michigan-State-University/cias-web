import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import noop from 'lodash/noop';

import { pickUserAttributes, mapCurrentUser } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';
import { FETCH_SELF_DETAILS_REQUEST } from '../constants';
import { fetchSelfDetailsSuccess } from '../actions';

export function* fetchSelfDetails() {
  const requestUrl = 'v1/me';
  try {
    const {
      data: { data },
    } = yield call(axios.get, requestUrl);
    const editedUser = mapCurrentUser(data);
    const pickedUser = pickUserAttributes(editedUser);
    yield call(LocalStorageService.updateState, { user: pickedUser });
    yield put(fetchSelfDetailsSuccess(pickedUser));
  } catch {
    noop();
  }
}

export default function* fetchSelfDetailsSaga() {
  yield takeLatest(FETCH_SELF_DETAILS_REQUEST, fetchSelfDetails);
}
