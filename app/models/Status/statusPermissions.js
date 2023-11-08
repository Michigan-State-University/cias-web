import { draft, published, closed, archived } from './StatusTypes';

const ALLOWED_EDIT = [draft];

const ALLOWED_PREVIEW = [draft];

const ALLOWED_INVITING_PARTICIPANTS = [published];

const ALLOWED_CREATING_PREDEFINED_PARTICIPANTS = [draft, published];

const ALLOWED_CHANGING_ACCESS_SETTINGS = [draft];

const ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION = [draft, published];

const ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION = [draft, published];

const ALLOWED_ENABLE_CHAT = [draft, published];

const ALLOWED_CLEAR_INTERVENTION_DATA = [closed, archived];

export const canEdit = (interventionStatus) =>
  ALLOWED_EDIT.includes(interventionStatus);

export const canPreview = (interventionStatus) =>
  ALLOWED_PREVIEW.includes(interventionStatus);

export const canInviteParticipants = (interventionStatus) =>
  ALLOWED_INVITING_PARTICIPANTS.includes(interventionStatus);

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
