import find from 'lodash/find';
import { createSelector } from 'reselect';
import { selectProblem } from 'global/reducers/intervention';

export const makeSelectCurrentSession = () =>
  createSelector(
    selectProblem,
    problemState => {
      if (problemState.problem && problemState.problem.sessions)
        return find(
          problemState.problem.sessions,
          ({ position }) => position - 1 === problemState.currentSessionIndex,
        );
    },
  );
