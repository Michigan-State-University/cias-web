import { updateQuestionData } from 'global/reducers/questions';
import { HenryFordQuestionDTO } from 'models/Question';

import { REORDER } from './constants';

export const reorderAnswersAction = (
  items: HenryFordQuestionDTO['body']['data'],
) => updateQuestionData({ type: REORDER, data: { items } });
