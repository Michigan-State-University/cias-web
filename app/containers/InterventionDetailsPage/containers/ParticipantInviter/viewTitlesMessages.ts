import { defineMessages } from 'react-intl';

import { InviteParticipantModalView } from './types';

export const scope =
  'app.containers.InterventionDetailsPage.containers.ParticipantInviter.InviteParticipantModalViews';

export default defineMessages({
  [InviteParticipantModalView.PARTICIPANT_LIST]: {
    id: `${scope}.PARTICIPANT_LIST`,
    defaultMessage: 'Invite participants',
  },
  [InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS]: {
    id: `${scope}.INVITE_EMAIL_PARTICIPANTS`,
    defaultMessage: 'Invite e-mail participants',
  },
  [InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT]: {
    id: `${scope}.INVITE_PREDEFINED_PARTICIPANT`,
    defaultMessage: 'Create predefined participant',
  },
  [InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT]: {
    id: `${scope}.MANAGE_PREDEFINED_PARTICIPANT`,
    defaultMessage: 'Manage participant',
  },
  [InviteParticipantModalView.UPLOAD_EMAILS]: {
    id: `${scope}.UPLOAD_EMAILS`,
    defaultMessage: 'Bulk e-mail upload',
  },
});
