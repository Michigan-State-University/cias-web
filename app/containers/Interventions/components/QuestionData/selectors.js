import { createSelector } from 'reselect';
import { selectQuestions } from 'global/reducers/questions';

const makeSelectSelectedQuestionType = () =>
  createSelector(
    selectQuestions,
    substate => substate.questions[substate.selectedQuestion].type,
  );

export { makeSelectSelectedQuestionType };
