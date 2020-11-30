import find from 'lodash/find';
import { createSelector } from 'reselect';
import { selectProblem } from 'global/reducers/intervention';

export const makeSelectCurrentIntervention = () =>
  createSelector(
    selectProblem,
    problemState => {
      if (problemState.problem && problemState.problem.interventions)
        return find(
          problemState.problem.interventions,
          ({ position }) =>
            position - 1 === problemState.currentInterventionIndex,
        );
    },
  );
