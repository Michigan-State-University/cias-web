import produce from 'immer';
import { getType } from 'typesafe-actions';

import {
  fetchAnswersError,
  fetchAnswersRequest,
  fetchAnswersSuccess,
} from './actions';
import { AnswersAction, AnswersState } from './types';

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
export const answersReducer = (
  state: AnswersState = initialState,
  action: AnswersAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(fetchAnswersRequest):
        draft.loaders.fetchAnswers = true;
        draft.errors.fetchAnswers = null;
        break;
      case getType(fetchAnswersSuccess):
        draft.answers = action.payload.answers;
        draft.loaders.fetchAnswers = false;
        break;
      case getType(fetchAnswersError):
        draft.errors.fetchAnswers = action.payload.error;
        draft.answers = [];
        draft.loaders.fetchAnswers = false;
        break;
    }
  });
