import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { UPDATE_REPORT_TEMPLATE_REQUEST } from '../constants';
import {
  updateReportTemplateSuccess,
  updateReportTemplateFailure,
} from '../actions';
import messages from './messages';

function* updateReportTemplate({
  payload: { sessionId, reportTemplate, imageData, imagePropName },
}) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${reportTemplate.id}`;

  try {
    if (!imageData || !imagePropName) {
      const { data } = yield axios.put(
        requestUrl,
        objectToSnakeCase({
          reportTemplate: { ...reportTemplate, logo: imageData },
        }),
      );

      const mappedData = jsonApiToObject(data, 'reportTemplate');
      yield put(updateReportTemplateSuccess(mappedData));
    } else {
      const formData = new FormData();
      formData.append(`report_template[${imagePropName}]`, imageData);

      const { data } = yield axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const mappedData = jsonApiToObject(data, 'reportTemplate');
      yield put(updateReportTemplateSuccess(mappedData));
    }
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.updateReportTemplateFailure),
    );
    yield put(updateReportTemplateFailure(error));
  }
}

export default function* updateReportTemplateSaga() {
  yield takeEvery(UPDATE_REPORT_TEMPLATE_REQUEST, updateReportTemplate);
}
