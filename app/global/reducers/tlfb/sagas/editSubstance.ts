import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { EDIT_SUBSTANCE_REQUEST, EDIT_SUBSTANCE_ERROR } from '../constants';
import {
  editTlfbSubstance,
  editTlfbSubstanceError,
  editTlfbSubstanceSuccess,
} from '../actions';
import messages from '../messages';

function* editSubstanceBody({
  payload: { substanceIndex, body },
}: ReturnType<typeof editTlfbSubstance>) {
  const url = `/v1/tlfb/substances/${substanceIndex}`;
  try {
    yield call(axios.patch, url, {
      body,
    });
    yield put(editTlfbSubstanceSuccess());
  } catch (error) {
    // @ts-ignore
    yield call(toast.error, formatMessage(messages.editTlfbSubstanceError), {
      id: EDIT_SUBSTANCE_ERROR,
    });
    yield put(editTlfbSubstanceError());
  }
}

export function* editSubstanceBodySaga() {
  yield takeLatest(EDIT_SUBSTANCE_REQUEST, editSubstanceBody);
}
