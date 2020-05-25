import { createSelector } from 'reselect';
import { selectCreateInterventionPageDomain } from '../../containers/CreateInterventionPage/selectors';

const makeSelectSelectedQuestionType = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.questions[substate.selectedQuestion].type,
  );

export { makeSelectSelectedQuestionType };
