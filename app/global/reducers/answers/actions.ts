import { createAction } from 'typesafe-actions';

import { Answer } from 'models/Answer';
import { ApiError } from 'models/Api';

import {
  FETCH_ANSWERS_REQUEST,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_ERROR,
} from './constants';

export const fetchAnswersRequest = createAction(
  FETCH_ANSWERS_REQUEST,
  (action) => (userSessionId: string) => action({ userSessionId }),
);
export const fetchAnswersSuccess = createAction(
  FETCH_ANSWERS_SUCCESS,
  (action) => (answers: Answer[]) => action({ answers }),
);
export const fetchAnswersError = createAction(
  FETCH_ANSWERS_ERROR,
  (action) => (error: ApiError) => action({ error }),
);
