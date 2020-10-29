import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';
import { success as showSuccess } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import LocalStorageService from 'utils/localStorageService';
import { formatMessage } from 'utils/intlOutsideReact';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { createUser } from 'utils/reducerCreators';

import { initialState } from 'global/reducers/auth/reducer';
import { apiResponseWithSnakeCase } from './mockApiResponse';
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
    const apiResponse = cloneDeep(apiResponseWithSnakeCase);
    apiResponse.data.email = payload.newEmail;
    const successUser = mapCurrentUser(apiResponse.data);

    return expectSaga(changeEmail, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .call(LocalStorageService.updateState, successUser)
      .call(LocalStorageService.setUid, successUser.email)
      .put(
        showSuccess(formatMessage(messages.changeEmailSuccess), {
          id: CHANGE_EMAIL_SUCCESS,
        }),
      )
      .put(changeEmailSuccess(successUser))
      .run();
  });
  it('Check changeEmail error connection', () => {
    const error = new Error('test-error');
    expectSaga(changeEmail, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
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
