import { createSelector } from 'reselect';
import { selectProblem } from 'global/reducers/problem';

export const makeSelectCurrenIntervention = () =>
  createSelector(
    selectProblem,
    problemState => {
      if (problemState.problem && problemState.problem.interventions)
        return problemState.problem.interventions[
          problemState.currentInterventionIndex
        ];
    },
  );
