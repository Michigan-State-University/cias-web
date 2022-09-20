import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import {
  REMOVE_FILLED_SCRIPT_TEMPLATE_REQUEST,
  REMOVE_FILLED_SCRIPT_TEMPLATE_ERROR,
} from '../constants';
import {
  removeFilledScriptTemplateError,
  removeFilledScriptTemplateRequest,
  removeFilledScriptTemplateSuccess,
} from '../actions';
import messages from '../messages';

export function* removeFilledScriptTemplate({
  payload: { interventionId },
}: ReturnType<typeof removeFilledScriptTemplateRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;

  try {
    const { data } = yield call(
      axios.patch,
      url,
      objectToSnakeCase({ navigatorSetup: { filledScriptTemplate: null } }),
    );

    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;

    yield put(removeFilledScriptTemplateSuccess(navigatorSetup));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: REMOVE_FILLED_SCRIPT_TEMPLATE_ERROR,
    });
    yield put(removeFilledScriptTemplateError(error as ApiError));
  }
}

export default function* removeFilledScriptTemplateSaga() {
  yield takeLatest(
    REMOVE_FILLED_SCRIPT_TEMPLATE_REQUEST,
    removeFilledScriptTemplate,
  );
}
