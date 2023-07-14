import { takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { expectSaga } from 'redux-saga-test-plan';

import { RoutePath } from 'global/constants';

import LocalStorageService from 'utils/localStorageService';
import logOutSaga, { logOut } from '../logOut';
import { LOG_OUT } from '../../constants';

describe('logOut saga', () => {
  it('Check editUser generator success connection', () =>
    expectSaga(logOut)
      .call.fn(LocalStorageService.clearUserData)
      .put(push(RoutePath.LOGIN))
      .run());
  it('Check logOut connection', () => {
    const sagaFunction = logOutSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(LOG_OUT, logOut));
  });
});
