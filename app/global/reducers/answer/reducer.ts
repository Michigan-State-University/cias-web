import { Reducer } from 'redux';
import produce from 'immer';

import { AppAction } from 'utils/actionBuilder';

import { Answer } from 'models/Answer';

import {
  FETCH_ANSWERS_ERROR,
  FETCH_ANSWERS_REQUEST,
  FETCH_ANSWERS_SUCCESS,
} from './constants';
import { fetchAnswersError, fetchAnswersSuccess } from './actions';

export type AnswersState = {
  answers: Answer[];
  loaders: Record<string, boolean>;
  errors: Record<string, Nullable<any>>; // TODO create error type
};

export const initialState: AnswersState = {
  answers: [],
  loaders: {
    fetchAnswers: false,
  },
  errors: {
    fetchAnswers: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const answersReducer: Reducer<AnswersState, AppAction<any>> = (
  state = initialState,
  action: AppAction<any>, // TODO stricter AppAction type
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_ANSWERS_REQUEST:
        draft.loaders.fetchAnswers = true;
        draft.errors.fetchAnswers = null;
        break;
      case FETCH_ANSWERS_SUCCESS:
        const { payload: fetchAnswersSuccessPayload } = action as ReturnType<
          typeof fetchAnswersSuccess
        >; // TODO think of improvement
        draft.answers = fetchAnswersSuccessPayload.answers;
        draft.loaders.fetchAnswers = false;
        break;
      case FETCH_ANSWERS_ERROR:
        const { payload: fetchAnswersErrorPayload } = action as ReturnType<
          typeof fetchAnswersError
        >;
        draft.errors.fetchAnswers = fetchAnswersErrorPayload.error;
        draft.answers = [];
        draft.loaders.fetchAnswers = false;
        break;
    }
  });
