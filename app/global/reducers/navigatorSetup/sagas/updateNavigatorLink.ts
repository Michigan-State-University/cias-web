import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  UPDATE_NAVIGATOR_LINK_ERROR,
  UPDATE_NAVIGATOR_LINK_REQUEST,
} from '../constants';
import {
  addNavigatorLinkError,
  updateNavigatorLinkRequest,
  updateNavigatorLinkSuccess,
} from '../actions';
import messages from '../messages';

function* updateNavigatorLink({
  payload: { interventionId, linkId, linkData },
}: ReturnType<typeof updateNavigatorLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/links/${linkId}`;
  try {
    yield call(axios.patch, url, objectToSnakeCase({ link: linkData }));
    yield put(updateNavigatorLinkSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: UPDATE_NAVIGATOR_LINK_ERROR,
    });
    yield put(addNavigatorLinkError(error as ApiError));
  }
}

export default function* updateNavigatorLinkSaga() {
  yield takeLatest(UPDATE_NAVIGATOR_LINK_REQUEST, updateNavigatorLink);
}
