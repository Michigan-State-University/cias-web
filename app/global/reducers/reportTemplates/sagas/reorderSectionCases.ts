import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ReportTemplateVariant } from 'models/ReportTemplate';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  REORDER_SECTION_CASES_FAILURE,
  REORDER_SECTION_CASES_REQUEST,
} from '../constants';
import {
  reorderSectionCasesFailure,
  reorderSectionCasesRequest,
  reorderSectionCasesSuccess,
} from '../actions';
import messages from '../messages';

function* reorderSectionCases({
  payload: { sectionId, reorderedCases },
}: ReturnType<typeof reorderSectionCasesRequest>) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/move_variants`;

  try {
    yield axios.patch(
      requestUrl,
      objectToSnakeCase({
        variant: {
          position: (reorderedCases as ReportTemplateVariant[]).map(
            ({ id, position }) => ({
              id,
              position,
            }),
          ),
        },
      }),
    );

    yield put(reorderSectionCasesSuccess(sectionId));
  } catch (error) {
    yield put(reorderSectionCasesFailure(sectionId));
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.updateSectionCaseError),
      {
        toastId: REORDER_SECTION_CASES_FAILURE,
      },
    );
  }
}

export default function* reorderSectionCasesSaga() {
  yield takeEvery(REORDER_SECTION_CASES_REQUEST, reorderSectionCases);
}
