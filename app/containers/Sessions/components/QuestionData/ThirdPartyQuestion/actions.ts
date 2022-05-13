import { updateQuestionData } from 'global/reducers/questions';
import { ThirdPartyReportQuestionData } from 'models/Question';

import { REORDER } from './constants';

export const reorderAnswersAction = (items: ThirdPartyReportQuestionData[]) =>
  updateQuestionData({ type: REORDER, data: { items } });
