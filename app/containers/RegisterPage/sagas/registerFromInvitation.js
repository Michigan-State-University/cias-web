import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { UserStorageController } from 'global/reducers/auth';
import { loginSuccess, logIn } from 'global/reducers/auth/actions';

import { formatMessage } from 'utils/intlOutsideReact';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import {
  REGISTER_FROM_INVITATION_REQUEST,
  REGISTER_FROM_INVITATION_SUCCESS,
} from '../constants';
import {
  registerFromInvitationSuccess,
  registerFromInvitationError,
} from '../actions';
import messages from '../messages';

function* registerFromInvitation({ payload }) {
  const requestURL = 'v1/users/invitations';

  const { email, ...reqObj } = objectToSnakeCase(payload);
  try {
    const {
      data: { data, verification_code: verificationCode },
    } = yield axios.patch(requestURL, {
      invitation: reqObj,
    });

    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.setState, { user: { ...mappedUser } });

    const userStorageController = new UserStorageController(email);
    userStorageController.setVerificationCode(verificationCode);

    yield put(registerFromInvitationSuccess());

    yield put(logIn(mappedUser));
    yield put(loginSuccess());

    yield call(
      toast.success,
      formatMessage(messages.createdAccountFromInvitation),
      {
        toastId: REGISTER_FROM_INVITATION_SUCCESS,
      },
    );
  } catch (error) {
    yield put(registerFromInvitationError(requestErrorMessageHandler(error)));
  }
}

export default function* registerFromInvitationSaga() {
  yield takeLatest(REGISTER_FROM_INVITATION_REQUEST, registerFromInvitation);
}
