import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import { NavigatorHelpingMaterials } from 'models/NavigatorSetup';
import { ApiError } from 'models/Api';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  fetchNavigatorHelpingMaterialsRequest,
  fetchNavigatorHelpingMaterialsSuccess,
  fetchNavigatorHelpingMaterialsError,
} from '../actions';
import { FETCH_NAVIGATOR_HELPING_MATERIALS_REQUEST } from '../constants';

function* fetchNavigatorHelpingMaterials({
  payload: { interventionId },
}: ReturnType<typeof fetchNavigatorHelpingMaterialsRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_helping_materials`;
  try {
    const { data } = yield call(axios.get, url);
    const navigatorHelpingMaterials: NavigatorHelpingMaterials =
      jsonApiToObject(data, 'helpingMaterials');
    yield put(
      fetchNavigatorHelpingMaterialsSuccess(
        interventionId,
        navigatorHelpingMaterials,
      ),
    );
  } catch (error) {
    yield put(
      fetchNavigatorHelpingMaterialsError(interventionId, error as ApiError),
    );
  }
}

export function* fetchNavigatorHelpingMaterialsSaga() {
  yield takeLatest(
    FETCH_NAVIGATOR_HELPING_MATERIALS_REQUEST,
    fetchNavigatorHelpingMaterials,
  );
}
