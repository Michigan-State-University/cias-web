import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { UNASSIGN_TAG_REQUEST } from '../constants';
import { unassignTagSuccess, unassignTagError } from '../actions';

export function* unassignTag({ payload: { interventionId, tagId } }) {
  const requestURL = `v1/interventions/${interventionId}/tags/${tagId}`;
  try {
    yield call(axios.delete, requestURL);
    yield put(unassignTagSuccess(tagId));
  } catch (error) {
    yield put(unassignTagError(error));
  }
}

export default function* unassignTagSaga() {
  yield takeLatest(UNASSIGN_TAG_REQUEST, unassignTag);
}
