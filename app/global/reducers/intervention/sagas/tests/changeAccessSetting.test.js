import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { ids } from 'containers/SettingsPanel/utils';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeAccessSettingSuccess,
  changeAccessSettingFailure,
} from '../../actions';
import {
  CHANGE_ACCESS_SETTING_ERROR,
  CHANGE_ACCESS_SETTING_REQUEST,
} from '../../constants';
import changeAccessSettingSaga, {
  changeAccessSetting,
} from '../changeAccessSetting';
import messages from '../../messages';

describe('changeAccessSetting saga', () => {
  const mockIntervention = createIntervention();
  const payload = { id: mockIntervention.id, setting: ids.anyoneWithTheLink };

  it('Check changeAccessSetting generator success connection', () =>
    expectSaga(changeAccessSetting, { payload })
      .provide([[matchers.call.fn(axios.patch), {}]])
      .put(changeAccessSettingSuccess())
      .run());
  it('Check changeAccessSetting error connection', () => {
    const error = new Error('test');
    return expectSaga(changeAccessSetting, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, formatMessage(messages.changeAccessSettingFailure), {
        toastId: CHANGE_ACCESS_SETTING_ERROR,
      })
      .put(changeAccessSettingFailure(error))
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = changeAccessSettingSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_ACCESS_SETTING_REQUEST, changeAccessSetting),
    );
  });
});
