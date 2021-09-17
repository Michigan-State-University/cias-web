import { actionBuilder } from 'utils/actionBuilder';

import { Answer } from 'models/Answer';
import { ApiError } from 'models/Api';

import {
  FETCH_ANSWERS_REQUEST,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_ERROR,
} from './constants';

export const fetchAnswersRequest = (userSessionId: string) =>
  actionBuilder(FETCH_ANSWERS_REQUEST, { userSessionId });
export const fetchAnswersSuccess = (answers: Answer[]) =>
  actionBuilder(FETCH_ANSWERS_SUCCESS, { answers });
export const fetchAnswersError = (error: ApiError) =>
  actionBuilder(FETCH_ANSWERS_ERROR, { error });
