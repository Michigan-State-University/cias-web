import { createSelector } from 'reselect';

import { selectLocalState } from 'global/reducers/localState';
import { selectProblem } from 'global/reducers/problem';

export const makeSelectCurrenIntervention = () =>
  createSelector(
    selectLocalState,
    selectProblem,
    (localState, problemState) => {
      if (problemState.problem && problemState.problem.interventions)
        return problemState.problem.interventions[
          localState.currentInterventionIndex
        ];
    },
  );
