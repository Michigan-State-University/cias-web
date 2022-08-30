import { answersReducerKey } from './answers/reducer';
import { AnswersState } from './answers/types';

import { tlfbReducerKey } from './tlfb/reducer';
import { TlfbState } from './tlfb/types';

export type RootState = {
  [answersReducerKey]: AnswersState;
  [tlfbReducerKey]: TlfbState;
};
