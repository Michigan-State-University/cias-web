import { createSelector } from 'reselect';

import { selectIntervention } from 'global/reducers/intervention';

export const makeSelectCurrentSession = () =>
  createSelector(
    selectIntervention,
    ({ intervention, currentSessionIndex }) => {
      if (intervention && intervention.sessions) {
        return intervention.sessions[currentSessionIndex];
      }
    },
  );
