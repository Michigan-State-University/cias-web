import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { ReportTemplateBuilder } from 'models/ReportTemplate';
import { UPDATE_REPORT_TEMPLATE_REQUEST } from '../constants';
import {
  updateReportTemplateSuccess,
  updateReportTemplateFailure,
} from '../actions';

function* updateReportTemplate({
  payload: { sessionId, reportTemplate, imageData },
}) {
  const requestUrl = `/v1/sessions/${sessionId}/report_templates/${
    reportTemplate.id
  }`;

  try {
    if (!imageData) {
      const {
        data: { data },
      } = yield axios.put(
        requestUrl,
        objectToSnakeCase({
          reportTemplate: { ...reportTemplate, logo: imageData },
        }),
      );

      const mappedData = new ReportTemplateBuilder().fromJson(data).build();

      yield put(updateReportTemplateSuccess(mappedData));
    } else {
      const formData = new FormData();
      formData.append('report_template[logo]', imageData);

      const {
        data: { data },
      } = yield axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const mappedData = new ReportTemplateBuilder().fromJson(data).build();

      yield put(updateReportTemplateSuccess(mappedData));
    }
  } catch (error) {
    yield put(updateReportTemplateFailure(error));
  }
}

export default function* updateReportTemplateSaga() {
  yield takeLatest(UPDATE_REPORT_TEMPLATE_REQUEST, updateReportTemplate);
}
