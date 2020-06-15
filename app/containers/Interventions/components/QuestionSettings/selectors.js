import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../containers/EditInterventionPage/selectors';

const makeSelectSelectedQuestionType = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate =>
      substate.questions.length > 0
        ? substate.questions[substate.selectedQuestion].type
        : null,
  );

export { makeSelectSelectedQuestionType };
