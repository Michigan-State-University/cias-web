import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  FETCH_TEXT_MESSAGES_ERROR,
  FETCH_TEXT_MESSAGES_REQUEST,
} from '../constants';
import {
  fetchTextMessagesSuccess,
  fetchTextMessagesError,
  changeSelectedMessageId,
  fetchVariantsAndPhonesRequest,
} from '../actions';
import messages from '../messages';
import { makeSelectFilters, makeSelectSelectedMessageId } from '../selectors';
import { mapFiltersToStringArray } from '../utils';

export function* fetchTextMessages({ payload: { sessionId } }) {
  try {
    const requestUrl = `/v1/sessions/${sessionId}/sms_plans`;

    const filters = yield select(makeSelectFilters());

    const { data } = yield call(axios.get, requestUrl, {
      params: { types: mapFiltersToStringArray(filters) },
    });

    const mappedData = jsonApiToArray(data, 'smsPlan');

    yield put(fetchTextMessagesSuccess(mappedData));
    if (mappedData?.length) {
      const currentSelectedId = yield select(makeSelectSelectedMessageId());

      let selectedTextMessageId = currentSelectedId;
      if (!mappedData.find(({ id }) => id === currentSelectedId))
        selectedTextMessageId = mappedData[0].id;

      yield put(changeSelectedMessageId(selectedTextMessageId));
      yield put(fetchVariantsAndPhonesRequest());
    }
  } catch (error) {
    yield call(toast.error, formatMessage(messages.fetchTextMessagesError), {
      toastId: FETCH_TEXT_MESSAGES_ERROR,
    });
    yield put(fetchTextMessagesError(error));
  }
}

export default function* fetchTextMessagesSaga() {
  yield takeLatest(FETCH_TEXT_MESSAGES_REQUEST, fetchTextMessages);
}
