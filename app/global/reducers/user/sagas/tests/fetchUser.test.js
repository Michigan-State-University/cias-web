import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { pickUserAttributes } from 'utils/mapResponseObjects';
import { fetchUser } from 'global/reducers/user/sagas/fetchUser';
import { fetchUserSaga } from 'global/reducers/user/sagas/index';
import { apiUserResponse } from 'utils/apiResponseCreators';

import objectToCamelCase from 'utils/objectToCamelCase';
import { fetchUserSuccess, fetchUserFailure } from '../../actions';
import { FETCH_USER_REQUEST } from '../../constants';

describe('fetchUser saga', () => {
  const payload = {
    userId: '0',
  };

  it('Check fetchUser generator success connection', () => {
    const apiResponse = apiUserResponse();
    const apiResponseWithoutAttributes = {
      id: apiResponse.data.id,
      ...apiResponse.data.attributes,
    };

    return expectSaga(fetchUser, { payload })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchUserSuccess(
          pickUserAttributes(objectToCamelCase(apiResponseWithoutAttributes)),
        ),
      )
      .run();
  });
  it('Check fetchUser error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchUser, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchUserFailure(error))
      .run();
  });

  it('Check fetchUser connection', () => {
    const sagaFunction = fetchUserSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_USER_REQUEST, fetchUser),
    );
  });
});
