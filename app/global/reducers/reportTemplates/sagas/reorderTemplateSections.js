import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { REORDER_TEMPLATE_SECTIONS_REQUEST } from '../constants';
import {
  reorderTemplateSectionSuccess,
  reorderTemplateSectionFailure,
} from '../actions';

function* reorderTemplateSections({
  payload: { reorderedSections, reportId },
}) {
  const requestUrl = `/v1/report_templates/${reportId}/move_sections`;

  try {
    const { data } = yield axios.patch(
      requestUrl,
      objectToSnakeCase({
        section: {
          position: reorderedSections.map(({ id, position }) => ({
            id,
            position,
          })),
        },
      }),
    );

    const mappedData = jsonApiToObject(data, 'reportTemplate');
    yield put(reorderTemplateSectionSuccess(mappedData));
  } catch (error) {
    yield put(reorderTemplateSectionFailure(error));
  }
}

export default function* reorderTemplateSectionsSaga() {
  yield takeLatest(REORDER_TEMPLATE_SECTIONS_REQUEST, reorderTemplateSections);
}
