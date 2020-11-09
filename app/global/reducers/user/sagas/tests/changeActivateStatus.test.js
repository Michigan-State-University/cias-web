import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  changeActivateStatusSuccess,
  changeActivateStatusError,
} from '../../actions';

import { CHANGE_ACTIVATE_STATUS_REQUEST } from '../../constants';
import changeActivateStatusSaga, {
  changeActivateStatus,
} from '../changeActivateStatusSaga';
import messages from '../../messages';

describe('changeActivateStatus saga', () => {
  const createPayload = active => ({
    userId: '0',
    active,
  });

  it('Check changeActivateStatus generator success connection with false active', () => {
    const payload = createPayload(false);

    return expectSaga(changeActivateStatus, { payload })
      .provide([[matchers.call.fn(axios.delete), {}]])
      .put(changeActivateStatusSuccess())
      .call(toast.info, formatMessage(messages.changeStatusSuccess))
      .run();
  });
  it('Check changeActivateStatus generator success connection with true active', () => {
    const payload = createPayload(true);

    return expectSaga(changeActivateStatus, { payload })
      .provide([[matchers.call.fn(axios.patch), {}]])
      .put(changeActivateStatusSuccess())
      .call(toast.info, formatMessage(messages.changeStatusSuccess))
      .run();
  });
  it('Check changeActivateStatus error connection', () => {
    const error = new Error('test');
    const payload = createPayload(true);
    return expectSaga(changeActivateStatus, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(changeActivateStatusError())
      .call(toast.error, formatMessage(messages.changeStatusFailure))
      .run();
  });

  it('Check changeActivateStatus connection', () => {
    const sagaFunction = changeActivateStatusSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_ACTIVATE_STATUS_REQUEST, changeActivateStatus),
    );
  });
});
