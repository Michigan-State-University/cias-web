import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { ADD_SECTION_CASE_REQUEST } from '../constants';
import { addSectionCaseSuccess, addSectionCaseFailure } from '../actions';

function* addSectionCase({ payload: { sectionCase, sectionId } }) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/variants`;

  try {
    const { data } = yield axios.post(
      requestUrl,
      objectToSnakeCase({ variant: sectionCase }),
    );

    const mappedData = jsonApiToObject(data, 'variant');

    yield put(addSectionCaseSuccess(mappedData));
  } catch (error) {
    yield put(addSectionCaseFailure(error));
  }
}

export default function* addSectionCaseSaga() {
  yield takeLatest(ADD_SECTION_CASE_REQUEST, addSectionCase);
}
