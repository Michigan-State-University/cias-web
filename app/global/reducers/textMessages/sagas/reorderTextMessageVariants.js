import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  REORDER_TEXT_MESSAGE_VARIANTS_REQUEST,
  REORDER_TEXT_MESSAGE_VARIANTS_ERROR,
} from '../constants';
import {
  reorderTextMessageVariantsSuccess,
  reorderTextMessageVariantsError,
} from '../actions';
import messages from '../messages';

function* reorderTextMessageVariants({
  payload: { reorderedVariants, smsPlanId },
}) {
  const requestUrl = `/v1/sms_plans/${smsPlanId}/move_variants`;

  try {
    const { data } = yield axios.patch(
      requestUrl,
      objectToSnakeCase({
        variant: {
          position: reorderedVariants.map(({ id, position }) => ({
            id,
            position,
          })),
        },
      }),
    );

    const mappedData = jsonApiToObject(data, 'smsPlan');
    yield put(reorderTextMessageVariantsSuccess(mappedData));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderVariantsError), {
      toastId: REORDER_TEXT_MESSAGE_VARIANTS_ERROR,
    });
    yield put(reorderTextMessageVariantsError(error));
  }
}

export default function* reorderTextMessageVariantsSaga() {
  yield takeLatest(
    REORDER_TEXT_MESSAGE_VARIANTS_REQUEST,
    reorderTextMessageVariants,
  );
}
