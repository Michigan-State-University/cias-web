import { createSelector } from 'reselect';
import { getLangDir } from 'rtl-detect';

import { DEFAULT_LOCALE, isAppLanguageSupported } from 'i18n';

import { canEdit } from 'models/Status/statusPermissions';

import { makeSelectIsAdmin, makeSelectUserId } from 'global/reducers/auth';

import { makeSelectUserSessionLanguageCode } from 'containers/AnswerSessionPage/selectors';

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

export const makeSelectInterventionHfHsAccess = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.intervention?.hfhsAccess ?? false,
  );

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

export const makeSelectInterventionInvitations = () =>
  createSelector(selectIntervention, ({ invitations }) => invitations);

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
    selectIntervention,
    (substate) => substate.currentUserCollaboratorData,
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

export const makeSelectInterventionHfhsAccess = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.intervention?.hfhsAccess,
  );

export const makeSelectInvitationsStates = () =>
  createSelector(selectIntervention, (substate) => substate.invitationsStates);

export const makeSelectPredefinedParticipants = () =>
  createSelector(
    selectIntervention,
    (substate) => substate.predefinedParticipants,
  );

export const makeSelectPredefinedParticipantById = (id) =>
  createSelector(
    selectIntervention,
    ({ predefinedParticipants }) =>
      predefinedParticipants &&
      predefinedParticipants.find((participant) => participant.id === id),
  );

export const makeSelectInterventionLanguageCode = () =>
  createSelector(
    selectIntervention,
    makeSelectUserSessionLanguageCode(),
    ({ intervention }, userSessionLanguageCode) =>
      intervention?.languageCode ?? userSessionLanguageCode,
  );

// e.g. back, skip and continue buttons
export const makeSelectInterventionFixedElementsDirection = () =>
  createSelector(makeSelectInterventionLanguageCode(), (languageCode) =>
    getLangDir(
      languageCode && isAppLanguageSupported(languageCode)
        ? languageCode
        : DEFAULT_LOCALE,
    ),
  );

// e.g. question title and subtitle, answers' labels
export const makeSelectInterventionDynamicElementsDirection = () =>
  createSelector(makeSelectInterventionLanguageCode(), (languageCode) =>
    getLangDir(languageCode ?? DEFAULT_LOCALE),
  );
