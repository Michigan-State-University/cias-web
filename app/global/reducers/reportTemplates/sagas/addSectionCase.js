import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { SectionCase } from 'models/ReportTemplate';
import { ADD_SECTION_CASE_REQUEST } from '../constants';
import { addSectionCaseSuccess, addSectionCaseFailure } from '../actions';

function* addSectionCase({ payload: { sectionCase, sectionId } }) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/variants`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ variant: sectionCase }),
    );

    const mappedData = mapJsonApiToObject(data, 'variant', {
      isSingleObject: true,
    });

    yield put(addSectionCaseSuccess(new SectionCase({ ...mappedData })));
  } catch (error) {
    yield put(addSectionCaseFailure(error));
  }
}

export default function* addSectionCaseSaga() {
  yield takeLatest(ADD_SECTION_CASE_REQUEST, addSectionCase);
}
