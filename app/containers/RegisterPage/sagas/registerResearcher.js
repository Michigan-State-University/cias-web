import { takeLatest, put, call } from 'redux-saga/effects';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';

import LocalStorageService from 'utils/localStorageService';
import {
  REGISTER_RESEARCHER_REQUEST,
  REGISTER_RESEARCHER_SUCCESS,
} from '../constants';
import { registerResearcherSuccess, registerResearcherError } from '../actions';
import messages from '../messages';

function* registerResearcher({ payload }) {
  const requestURL = 'v1/users/invitations';
  const { email, ...reqObj } = objectToSnakeCase(payload);
  try {
    yield axios.patch(requestURL, {
      invitation: reqObj,
    });
    yield put(registerResearcherSuccess());
    yield put(push('/login'));
    yield call(LocalStorageService.clearUserData);
    yield call(
      toast.success,
      formatMessage(messages.createdResearcherAccount),
      {
        toastId: REGISTER_RESEARCHER_SUCCESS,
      },
    );
  } catch (error) {
    yield put(registerResearcherError(requestErrorMessageHandler(error)));
  }
}

export default function* registerResearcherSaga() {
  yield takeLatest(REGISTER_RESEARCHER_REQUEST, registerResearcher);
}
