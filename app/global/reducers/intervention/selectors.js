import { createSelector } from 'reselect';

import { canEdit } from 'models/Status/statusPermissions';

import { makeSelectIsAdmin, makeSelectUserId } from 'global/reducers/auth';

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

export const makeSelectHasCollaborators = () =>
  createSelector(makeSelectIntervention(), (intervention) =>
    Boolean(intervention?.hasCollaborators),
  );

export const makeSelectCurrentEditor = () =>
  createSelector(
    makeSelectIntervention(),
    (intervention) => intervention?.currentEditor ?? null,
  );

export const makeSelectIsCurrentUserEditor = () =>
  createSelector(
    makeSelectCurrentEditor(),
    makeSelectUserId(),
    (currentEditor, currentUserId) => currentEditor?.id === currentUserId,
  );

export const makeSelectCollaborationLoading = () =>
  createSelector(
    makeSelectInterventionLoader('startingEditing'),
    makeSelectInterventionLoader('stoppingEditing'),
    (startingEditing, stoppingEditing) => startingEditing || stoppingEditing,
  );

export const makeSelectIsCurrentUserInterventionOwner = () =>
  createSelector(
    makeSelectIntervention(),
    makeSelectUserId(),
    (intervention, currentUserId) => intervention?.userId === currentUserId,
  );

export const makeSelectCurrentUserCollaboratorData = () =>
  createSelector(
    makeSelectIntervention(),
    (intervention) => intervention?.currentUserCollaboratorData,
  );

export const makeSelectCanCurrentUserMakeChanges = () =>
  createSelector(
    makeSelectHasCollaborators(),
    makeSelectIsCurrentUserEditor(),
    makeSelectIsCurrentUserInterventionOwner(),
    makeSelectIsAdmin(),
    (
      hasCollaborators,
      isCurrentUserEditor,
      isAdmin,
      isCurrentUserInterventionOwner,
    ) => {
      if (hasCollaborators) return isCurrentUserEditor;
      return isAdmin || isCurrentUserInterventionOwner;
    },
  );

export const makeSelectEditingPossible = () =>
  createSelector(
    makeSelectIntervention(),
    makeSelectCanCurrentUserMakeChanges(),
    (intervention, canCurrentUserMakeChanges) => {
      if (!intervention) return false;
      if (!canEdit(intervention.status)) return false;
      return canCurrentUserMakeChanges;
    },
  );

export const makeSelectCanCurrentUserAccessParticipantsData = () =>
  createSelector(
    makeSelectIsCurrentUserInterventionOwner(),
    makeSelectCurrentUserCollaboratorData(),
    (isCurrentUserInterventionOwner, currentUserCollaboratorData) =>
      isCurrentUserInterventionOwner || currentUserCollaboratorData?.dataAccess,
  );
