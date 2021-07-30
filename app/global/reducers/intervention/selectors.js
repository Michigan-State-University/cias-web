import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectIntervention = (state) => state.intervention || initialState;

export const makeSelectInterventionState = () =>
  createSelector(selectIntervention, (substate) => substate);

export const makeSelectIntervention = () =>
  createSelector(selectIntervention, (substate) => substate.intervention);

export const makeSelectCacheIntervention = () =>
  createSelector(selectIntervention, (substate) => substate.cache.intervention);

export const makeSelectInterventionStatus = () =>
  createSelector(selectIntervention, (substate) =>
    substate.intervention ? substate.intervention.status : null,
  );

export const makeSelectInterventionLoader = (loader) =>
  createSelector(selectIntervention, (substate) => substate.loaders[loader]);

export const makeSelectCurrentSessionIndex = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.currentSessionIndex,
  );

export const makeSelectSessionById = (sessionId) =>
  createSelector(selectIntervention, (substate) =>
    substate.intervention.sessions.find(({ id }) => id === sessionId),
  );
