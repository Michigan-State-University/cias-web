import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { LinkFor, NavigatorSetup } from 'models/NavigatorSetup';

import {
  ADD_NAVIGATOR_LINK_REQUEST,
  ADD_NAVIGATOR_LINK_ERROR,
} from '../constants';
import {
  addNavigatorLinkRequest,
  addNavigatorLinkSuccess,
  addNavigatorLinkError,
} from '../actions';
import messages from '../messages';

function* addNavigatorLink({
  payload: { interventionId, linkData },
}: ReturnType<typeof addNavigatorLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/links`;
  try {
    const { data } = yield call(
      axios.post,
      url,
      objectToSnakeCase({
        link: {
          ...linkData,
          linkFor: LinkFor.NAVIGATORS,
        },
      }),
    );

    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;

    yield put(addNavigatorLinkSuccess(navigatorSetup));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: ADD_NAVIGATOR_LINK_ERROR,
    });
    yield put(addNavigatorLinkError(error as ApiError));
  }
}

export default function* addNavigatorLinkSaga() {
  yield takeLatest(ADD_NAVIGATOR_LINK_REQUEST, addNavigatorLink);
}
