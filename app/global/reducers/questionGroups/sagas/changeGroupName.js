import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  CHANGE_GROUP_NAME_REQUEST,
  CHANGE_GROUP_NAME_ERROR,
} from '../constants';
import { changeGroupNameError, changeGroupNameSuccess } from '../actions';

function* changeGroupName({ payload: { title, interventionId, groupId } }) {
  const requestURL = `/v1/interventions/${interventionId}/question_groups/${groupId}`;
  try {
    yield axios.put(requestURL, { title });
    yield put(changeGroupNameSuccess());
  } catch (error) {
    yield put(changeGroupNameError(error));
    yield put(
      showError(formatMessage(messages.changeGroupName), {
        id: CHANGE_GROUP_NAME_ERROR,
      }),
    );
  }
}

export default function* changeGroupNameSaga() {
  yield takeLatest(CHANGE_GROUP_NAME_REQUEST, changeGroupName);
}
