import { ActionType } from 'typesafe-actions';

import { Answer } from 'models/Answer';
import { ApiError } from 'models/Api';

import * as actions from './actions';

export type AnswersAction = ActionType<typeof actions>;

export type AnswersState = {
  answers: Answer[];
  loaders: Record<string, boolean>;
  errors: Record<string, Nullable<ApiError>>;
};
