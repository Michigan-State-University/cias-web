import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { mapJsonApiToObject } from 'utils/jsonApiMapper';

import {
  FETCH_VARIANTS_AND_PHONES_ERROR,
  FETCH_VARIANTS_AND_PHONES_REQUEST,
} from '../constants';
import {
  fetchVariantsAndPhonesSuccess,
  fetchVariantsAndPhonesError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';
import messages from '../messages';

export function* fetchVariantsAndPhones() {
  try {
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `v1/sms_plans/${currentTextMessageId}`;
    const { data } = yield call(axios.get, requestUrl);
    const mapped = mapJsonApiToObject(data, 'smsPlan', {
      isSingleObject: true,
    });

    const variants = mapped.variants ?? [];
    const phones = mapped.phones ?? [];
    const smsLinks = mapped.noFormulaSmsLinks ?? [];

    const hydratedVariants = variants.map((v) => ({
      ...v,
      smsLinks: v.smsLinks ?? [],
    }));

    yield put(
      fetchVariantsAndPhonesSuccess(hydratedVariants, phones, smsLinks),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.fetchVariantsAndPhonesError),
      {
        toastId: FETCH_VARIANTS_AND_PHONES_ERROR,
      },
    );
    yield put(fetchVariantsAndPhonesError(error));
  }
}

export default function* fetchVariantsAndPhonesSaga() {
  yield takeLatest(FETCH_VARIANTS_AND_PHONES_REQUEST, fetchVariantsAndPhones);
}
