import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';
import { fullDayToYearFormatter } from 'utils/formatters';

import {
  addNewTlfbSubstance,
  addNewTlfbSubstanceError,
  addNewTlfbSubstanceSuccess,
} from '../actions';

import {
  ADD_NEW_SUBSTANCE_REQUEST,
  ADD_NEW_SUBSTANCE_ERROR,
} from '../constants';
import messages from '../messages';

function* addNewSubstance({
  payload: { userSessionId, dayKey, questionGroupId },
}: ReturnType<typeof addNewTlfbSubstance>) {
  const url = `/v1/tlfb/substances`;
  try {
    const date = dayjs(dayKey, fullDayToYearFormatter).utc(true);

    const { data } = yield call(axios.post, url, {
      exact_date: date.toISOString(),
      user_session_id: userSessionId,
      question_group_id: questionGroupId,
      body: { substancesConsumed: null }, // TODO overwrite with CIAS30-2074 changes
    });

    const newSubstance = jsonApiToObject(data, 'substance');

    yield put(addNewTlfbSubstanceSuccess(newSubstance, dayKey));
  } catch (error) {
    // @ts-ignore
    yield call(toast.error, formatMessage(messages.addTlfbSubstanceError), {
      id: ADD_NEW_SUBSTANCE_ERROR,
    });
    yield put(addNewTlfbSubstanceError());
  }
}

export function* addNewSubstanceSaga() {
  yield takeLatest(ADD_NEW_SUBSTANCE_REQUEST, addNewSubstance);
}
