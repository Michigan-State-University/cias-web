import { updateQuestionData } from 'global/reducers/questions';
import { MultipleQuestionData } from 'models/Question';

import { REORDER } from './constants';

export const reorderAnswersAction = (items: MultipleQuestionData[]) =>
  updateQuestionData({ type: REORDER, data: { items } });
