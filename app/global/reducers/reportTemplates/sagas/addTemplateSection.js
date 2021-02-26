import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { TemplateSection } from 'models/ReportTemplate';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { ADD_TEMPLATE_SECTION_REQUEST } from '../constants';
import {
  addTemplateSectionSuccess,
  addTemplateSectionFailure,
  selectTemplateSection,
} from '../actions';

function* addTemplateSection({ payload: { section, reportId } }) {
  const requestUrl = `/v1/report_templates/${reportId}/sections`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ section }),
    );

    const mappedData = mapJsonApiToObject(data, 'section', {
      isSingleObject: true,
    });

    yield put(
      addTemplateSectionSuccess(new TemplateSection({ ...mappedData })),
    );
    yield put(selectTemplateSection(mappedData.id));
  } catch (error) {
    yield put(addTemplateSectionFailure(error));
  }
}

export default function* addTemplateSectionSaga() {
  yield takeLatest(ADD_TEMPLATE_SECTION_REQUEST, addTemplateSection);
}
