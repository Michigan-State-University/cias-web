import { updateQuestionData } from 'global/reducers/questions';
import { SingleQuestionData } from 'models/Question';

import { REORDER } from './constants';

export const reorderAnswersAction = (items: SingleQuestionData[]) =>
  updateQuestionData({ type: REORDER, data: { items } });
