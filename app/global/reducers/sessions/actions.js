import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_SUCCESS,
} from './constants';

export const fetchSessionsRequest = role =>
  actionBuilder(FETCH_SESSIONS_REQUEST, { role });
export const fetchSessionsSuccess = sessions =>
  actionBuilder(FETCH_SESSIONS_SUCCESS, { sessions });
export const fetchSessionsError = error =>
  actionBuilder(FETCH_SESSIONS_ERROR, { error });
