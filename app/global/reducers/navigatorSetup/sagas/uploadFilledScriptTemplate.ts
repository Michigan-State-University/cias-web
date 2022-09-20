import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';

import {
  UPLOAD_FILLED_SCRIPT_TEMPLATE_REQUEST,
  UPLOAD_FILLED_SCRIPT_TEMPLATE_ERROR,
} from '../constants';
import {
  uploadFilledScriptTemplateError,
  uploadFilledScriptTemplateRequest,
  uploadFilledScriptTemplateSuccess,
} from '../actions';
import messages from '../messages';

export function* uploadFilledScriptTemplate({
  payload: { interventionId, file },
}: ReturnType<typeof uploadFilledScriptTemplateRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;

  const formData = new FormData();
  formData.append(`navigator_setup[filled_script_template]`, file);

  const headers = { 'Content-Type': 'multipart/form-data' };

  try {
    const { data } = yield call(axios.put, url, formData, { headers });

    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;

    yield put(uploadFilledScriptTemplateSuccess(navigatorSetup));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: UPLOAD_FILLED_SCRIPT_TEMPLATE_ERROR,
    });
    yield put(uploadFilledScriptTemplateError(error as ApiError));
  }
}

export default function* uploadFilledScriptTemplateSaga() {
  yield takeLatest(
    UPLOAD_FILLED_SCRIPT_TEMPLATE_REQUEST,
    uploadFilledScriptTemplate,
  );
}
