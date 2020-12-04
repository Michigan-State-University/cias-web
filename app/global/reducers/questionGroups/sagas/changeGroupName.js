import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_ERROR,
} from '../constants';
import { changeGroupNameError, changeGroupNameSuccess } from '../actions';

function* changeGroupName({ payload: { title, sessionId, groupId } }) {
  const requestURL = `/v1/sessions/${sessionId}/question_groups/${groupId}`;
  try {
    yield axios.put(requestURL, { title });
    yield put(changeGroupNameSuccess());
  } catch (error) {
    yield put(changeGroupNameError(error));
    yield call(toast.error, formatMessage(messages.changeGroupName), {
      toastId: CHANGE_GROUP_NAME_ERROR,
    });
  }
}

export default function* changeGroupNameSaga() {
  yield takeLatest(CHANGE_GROUP_NAME_REQUEST, changeGroupName);
}
