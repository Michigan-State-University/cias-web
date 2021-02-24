import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { ReportTemplate } from 'models/ReportTemplate';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
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
      const { data } = yield axios.put(
        requestUrl,
        objectToSnakeCase({
          reportTemplate: { ...reportTemplate, logo: imageData },
        }),
      );

      const mappedData = mapJsonApiToObject(data, 'reportTemplate', {
        isSingleObject: true,
      });

      yield put(
        updateReportTemplateSuccess(new ReportTemplate({ ...mappedData })),
      );
    } else {
      const formData = new FormData();
      formData.append('report_template[logo]', imageData);

      const { data } = yield axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const mappedData = mapJsonApiToObject(data, 'reportTemplate', {
        isSingleObject: true,
      });

      yield put(
        updateReportTemplateSuccess(new ReportTemplate({ ...mappedData })),
      );
    }
  } catch (error) {
    yield put(updateReportTemplateFailure(error));
  }
}

export default function* updateReportTemplateSaga() {
  yield takeLatest(UPDATE_REPORT_TEMPLATE_REQUEST, updateReportTemplate);
}
