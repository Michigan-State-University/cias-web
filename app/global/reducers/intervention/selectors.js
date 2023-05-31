import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectIntervention = (state) => state.intervention || initialState;

export const makeSelectInterventionState = () =>
  createSelector(selectIntervention, (substate) => substate);

export const makeSelectIntervention = () =>
  createSelector(selectIntervention, (substate) => substate.intervention);

export const makeSelectInterventionId = () =>
  createSelector(
    makeSelectIntervention(),
    (intervention) => intervention?.id ?? null,
  );

export const makeSelectCacheIntervention = () =>
  createSelector(selectIntervention, (substate) => substate.cache.intervention);

export const makeSelectInterventionStatus = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.intervention?.status,
  );

export const makeSelectInterventionType = () =>
  createSelector(selectIntervention, (substate) => substate.intervention?.type);

export const makeSelectInterventionLoader = (name) =>
  createSelector(selectIntervention, ({ loaders }) => loaders[name]);

export const makeSelectInterventionError = (name) =>
  createSelector(selectIntervention, ({ errors }) => errors[name]);

export const makeSelectCurrentSessionIndex = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.currentSessionIndex,
  );

export const makeSelectSessionById = (sessionId) =>
  createSelector(selectIntervention, (substate) =>
    substate.intervention.sessions.find(({ id }) => id === sessionId),
  );

export const makeSelectInterventionOrganizationId = () =>
  createSelector(
    makeSelectIntervention(),
    ({ organizationId }) => organizationId,
  );

export const makeSelectInterventionInvites = () =>
  createSelector(selectIntervention, ({ invites }) => invites);

export const makeSelectInterventionSharedTo = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.intervention?.sharedTo,
  );

export const makeSelectInterventionCollaborators = () =>
  createSelector(selectIntervention, (substate) => substate.collaborators);

export const makeSelectIsCollaboratingIntervention = () =>
  createSelector(makeSelectIntervention(), ({ collaboratingUsersIds }) =>
    Boolean(collaboratingUsersIds?.length),
  );
