import { draft, published, closed } from './StatusTypes';

const ALLOWED_EDIT = [draft];

const ALLOWED_PREVIEW = [draft];

const ALLOWED_SHARING_WITH_PARTICIPANTS = [published];

const ALLOWED_ARCHIVE = [draft, closed];

const ALLOWED_CHANGING_ACCESS_SETTINGS = [draft];

const ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION = [draft, published];

const ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION = [draft, published];

const ALLOWED_SESSION_DELETE = [draft];

export const canEdit = interventionStatus =>
  ALLOWED_EDIT.includes(interventionStatus);

export const canPreview = interventionStatus =>
  ALLOWED_PREVIEW.includes(interventionStatus);

export const canShareWithParticipants = interventionStatus =>
  ALLOWED_SHARING_WITH_PARTICIPANTS.includes(interventionStatus);

export const canArchive = interventionStatus =>
  ALLOWED_ARCHIVE.includes(interventionStatus);

export const canChangeAccessSettings = interventionStatus =>
  ALLOWED_CHANGING_ACCESS_SETTINGS.includes(interventionStatus);

export const canAddParticipantsToIntervention = interventionStatus =>
  ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION.includes(interventionStatus);

export const canRemoveParticipantsFromIntervention = interventionStatus =>
  ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION.includes(interventionStatus);

export const canDeleteSession = interventionStatus =>
  ALLOWED_SESSION_DELETE.includes(interventionStatus);
