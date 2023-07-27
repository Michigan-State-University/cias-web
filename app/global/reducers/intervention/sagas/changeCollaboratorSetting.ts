import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import {
  changeCollaboratorSettingError,
  changeCollaboratorSettingRequest,
  changeCollaboratorSettingSuccess,
} from '../actions';
import messages from '../messages';
import { CHANGE_COLLABORATOR_SETTING_REQUEST } from '../constants';

export function* changeCollaboratorSetting({
  payload: { collaboratorId, setting, value, interventionId },
}: ReturnType<typeof changeCollaboratorSettingRequest>) {
  const requestURL = `v1/interventions/${interventionId}/collaborators/${collaboratorId}`;

  try {
    yield call(
      axios.patch,
      requestURL,
      objectKeysToSnakeCase({ [setting]: value }),
    );
    yield put(changeCollaboratorSettingSuccess());
  } catch (error) {
    yield put(changeCollaboratorSettingError());
    yield call(
      toast.error,
      formatMessage(messages.changeCollaboratorSettingError),
    );
  }
}

export default function* changeCollaboratorSettingSaga() {
  yield takeLatest(
    CHANGE_COLLABORATOR_SETTING_REQUEST,
    changeCollaboratorSetting,
  );
}
