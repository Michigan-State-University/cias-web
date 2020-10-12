import { draft, published, closed } from './StatusTypes';

const ALLOWED_EDIT = [draft];

const ALLOWED_PREVIEW = [draft];

const ALLOWED_SHARING_WITH_PARTICIPANTS = [published];

const ALLOWED_ARCHIVE = [draft, closed];

const ALLOWED_CHANGING_ACCESS_SETTINGS = [draft];

const ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION = [draft, published];

const ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION = [draft, published];

export const canEdit = problemStatus => ALLOWED_EDIT.includes(problemStatus);

export const canPreview = problemStatus =>
  ALLOWED_PREVIEW.includes(problemStatus);

export const canShareWithParticipants = problemStatus =>
  ALLOWED_SHARING_WITH_PARTICIPANTS.includes(problemStatus);

export const canArchive = problemStatus =>
  ALLOWED_ARCHIVE.includes(problemStatus);

export const canChangeAccessSettings = problemStatus =>
  ALLOWED_CHANGING_ACCESS_SETTINGS.includes(problemStatus);

export const canAddParticipantsToIntervention = problemStatus =>
  ALLOWED_ADDING_PARTICIPANTS_TO_INTERVENTION.includes(problemStatus);

export const canRemoveParticipantsFromIntervention = problemStatus =>
  ALLOWED_REMOVING_PARTICIPANTS_FROM_INTERVENTION.includes(problemStatus);
