import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  UPDATE_QUESTION_GROUP_ERROR,
  UPDATE_QUESTION_GROUP_REQUEST,
} from '../constants';
import {
  updateQuestionGroupSettingsError,
  updateQuestionGroupSettingsSuccess
} from '../actions';

function* updateQuestionGroup({ payload: { data, sessionId, groupId } }) {
  const requestURL = `/v1/sessions/${sessionId}/question_groups/${groupId}`;
  try {
    yield axios.put(requestURL, data);
    yield put(updateQuestionGroupSettingsSuccess());
  } catch (error) {
    yield put(updateQuestionGroupSettingsError(error));
    yield call(toast.error, formatMessage(messages.updateQuestionGroup), {
      toastId: UPDATE_QUESTION_GROUP_ERROR,
    });
  }
}

export default function* updateQuestionGroupSaga() {
  yield takeLatest(UPDATE_QUESTION_GROUP_REQUEST, updateQuestionGroup);
}
