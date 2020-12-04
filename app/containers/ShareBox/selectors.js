import find from 'lodash/find';
import { createSelector } from 'reselect';
import { selectIntervention } from 'global/reducers/intervention';

export const makeSelectCurrentSession = () =>
  createSelector(
    selectIntervention,
    interventionState => {
      if (
        interventionState.intervention &&
        interventionState.intervention.sessions
      )
        return find(
          interventionState.intervention.sessions,
          ({ position }) =>
            position - 1 === interventionState.currentSessionIndex,
        );
    },
  );
