import axios from 'axios';
import { success as showSuccess } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import { formatMessage } from 'utils/intlOutsideReact';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';

import { changePassword } from '../changePassword';
import { changePasswordSaga } from '../index';
import messages from '../../messages';
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from '../../constants';
import { changePasswordSuccess, changePasswordError } from '../../actions';

describe('changePassword saga', () => {
  const payload = {
    oldPassword: 'test',
    newPassword: 'test123',
    newPasswordConfirmation: 'test123',
  };

  it('Check changePassword generator success connection', () =>
    expectSaga(changePassword, { payload })
      .provide([[matchers.call.fn(axios.patch), {}]])
      .put(
        showSuccess(formatMessage(messages.changePasswordSuccess), {
          id: CHANGE_PASSWORD_SUCCESS,
        }),
      )
      .put(changePasswordSuccess())
      .run());
  it('Check changePassword generator error connection', () => {
    const error = new Error('test-error');
    expectSaga(changePassword, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(changePasswordError(error.toString()))
      .run();
  });
  it('Check changePassword connection', () => {
    const sagaFunction = changePasswordSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_PASSWORD_REQUEST, changePassword),
    );
  });
});
