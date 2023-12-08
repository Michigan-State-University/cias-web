import { InterventionStatus } from 'models/Intervention';

const ALLOWED_EDIT = [InterventionStatus.DRAFT];

const ALLOWED_PREVIEW = [InterventionStatus.DRAFT];

const ALLOWED_INVITING_PARTICIPANTS = [InterventionStatus.PUBLISHED];

const ALLOWED_COPYING_INVITATION_LINK = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
  InterventionStatus.PAUSED,
];

const ALLOWED_CREATING_PREDEFINED_PARTICIPANTS = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
  InterventionStatus.PAUSED,
];

const ALLOWED_CHANGING_ACCESS_SETTINGS = [InterventionStatus.DRAFT];

const ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
  InterventionStatus.PAUSED,
];

const ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
  InterventionStatus.PAUSED,
];

const ALLOWED_ENABLE_CHAT = [
  InterventionStatus.DRAFT,
  InterventionStatus.PUBLISHED,
  InterventionStatus.PAUSED,
];

const ALLOWED_CLEAR_INTERVENTION_DATA = [
  InterventionStatus.CLOSED,
  InterventionStatus.ARCHIVED,
];

export const canEdit = (interventionStatus) =>
  ALLOWED_EDIT.includes(interventionStatus);

export const canPreview = (interventionStatus) =>
  ALLOWED_PREVIEW.includes(interventionStatus);

export const canInviteParticipants = (interventionStatus) =>
  ALLOWED_INVITING_PARTICIPANTS.includes(interventionStatus);

export const canCopyInvitationLink = (interventionStatus) =>
  ALLOWED_COPYING_INVITATION_LINK.includes(interventionStatus);

export const canCreatePredefinedParticipants = (interventionStatus) =>
  ALLOWED_CREATING_PREDEFINED_PARTICIPANTS.includes(interventionStatus);

export const canChangeAccessSettings = (interventionStatus) =>
  ALLOWED_CHANGING_ACCESS_SETTINGS.includes(interventionStatus);

export const canAddParticipantsToIntervention = (interventionStatus) =>
  ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION.includes(interventionStatus);

export const canRemoveParticipantsFromIntervention = (interventionStatus) =>
  ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION.includes(interventionStatus);

export const canEnableChat = (interventionStatus) =>
  ALLOWED_ENABLE_CHAT.includes(interventionStatus);

export const canClearInterventionData = (interventionStatus) =>
  ALLOWED_CLEAR_INTERVENTION_DATA.includes(interventionStatus);
