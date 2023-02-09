import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_NAVIGATOR_LINK_REQUEST,
  REMOVE_NAVIGATOR_LINK_ERROR,
} from '../constants';
import {
  removeNavigatorLinkRequest,
  removeNavigatorLinkSuccess,
  removeNavigatorLinkError,
} from '../actions';
import messages from '../messages';

function* removeNavigatorLink({
  payload: { interventionId, linkId },
}: ReturnType<typeof removeNavigatorLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/links/${linkId}`;
  try {
    yield call(axios.delete, url);
    yield put(removeNavigatorLinkSuccess(linkId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: REMOVE_NAVIGATOR_LINK_ERROR,
    });
    yield put(removeNavigatorLinkError(linkId, error as ApiError));
  }
}

export default function* removeNavigatorLinkSaga() {
  yield takeLatest(REMOVE_NAVIGATOR_LINK_REQUEST, removeNavigatorLink);
}
