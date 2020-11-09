import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import LocalStorageService from 'utils/localStorageService';
import { formatMessage } from 'utils/intlOutsideReact';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { createUser } from 'utils/reducerCreators';
import { apiUserResponse } from 'utils/apiResponseCreators';

import { initialState } from 'global/reducers/auth/reducer';
import { CHANGE_EMAIL_REQUEST, CHANGE_EMAIL_SUCCESS } from '../../constants';
import { changeEmailSaga } from '../../index';
import { changeEmail } from '../changeEmail';
import messages from '../../messages';
import { changeEmailError, changeEmailSuccess } from '../../actions';

describe('changeEmail saga', () => {
  const payload = {
    oldPassword: 'test-password',
    newEmail: 'test@test.com',
  };

  const mockState = { auth: { ...initialState, user: createUser() } };
  it('Check changeEmail generator success connection', () => {
    const apiResponse = apiUserResponse();
    apiResponse.data.email = payload.newEmail;
    const successUser = mapCurrentUser(apiResponse.data);

    return expectSaga(changeEmail, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .call(LocalStorageService.updateState, successUser)
      .call(LocalStorageService.setUid, successUser.email)
      .call(toast.success, formatMessage(messages.changeEmailSuccess), {
        toastId: CHANGE_EMAIL_SUCCESS,
      })
      .put(changeEmailSuccess(successUser))
      .run();
  });
  it('Check changeEmail error connection', () => {
    const error = new Error('test-error');
    return expectSaga(changeEmail, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(changeEmailError(error.toString()))
      .run();
  });
  it('Check changeEmail connection', () => {
    const sagaFunction = changeEmailSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_EMAIL_REQUEST, changeEmail),
    );
  });
});
