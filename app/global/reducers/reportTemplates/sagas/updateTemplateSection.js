import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { TemplateSection } from 'models/ReportTemplate';
import { UPDATE_TEMPLATE_SECTION_REQUEST } from '../constants';
import {
  updateTemplateSectionSuccess,
  updateTemplateSectionFailure,
} from '../actions';

function* updateTemplateSection({ payload: { section, reportId } }) {
  const requestUrl = `/v1/report_templates/${reportId}/sections/${section.id}`;

  try {
    const { data } = yield axios.put(requestUrl, objectToSnakeCase(section));

    const mappedData = mapJsonApiToObject(data, 'section', {
      isSingleObject: true,
    });

    yield put(
      updateTemplateSectionSuccess(new TemplateSection({ ...mappedData })),
    );
  } catch (error) {
    yield put(updateTemplateSectionFailure(error));
  }
}

export default function* updateTemplateSectionSaga() {
  yield takeLatest(UPDATE_TEMPLATE_SECTION_REQUEST, updateTemplateSection);
}
