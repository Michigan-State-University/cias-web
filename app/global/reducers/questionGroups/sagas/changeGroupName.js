import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_ERROR,
} from '../constants';
import { changeGroupNameError } from '../actions';

function* changeGroupName({ payload: { title, interventionId, groupId } }) {
  const requestURL = `/v1/interventions/${interventionId}/questions_groups/${groupId}`;
  try {
    const response = yield axios.put(requestURL, { title });
    console.log(response);
    // yield put(changeGroupNameSuccess(copiedQuestion));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.copyError), {
        id: CHANGE_GROUP_NAME_ERROR,
      }),
    );
    yield put(changeGroupNameError(error));
  }
}

export default function* changeGroupNameSaga() {
  yield takeLatest(CHANGE_GROUP_NAME_REQUEST, changeGroupName);
}
