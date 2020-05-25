import { createSelector } from 'reselect';
import { selectEditInterventionPageDomain } from '../../containers/EditInterventionPage/selectors';

const makeSelectSelectedQuestionType = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questions[substate.selectedQuestion].type,
  );

export { makeSelectSelectedQuestionType };
