import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.InterventionDetailsPage.containers.InviteParticipantsButton';

export default defineMessages({
  inviteParticipantsButtonTitle: {
    id: `${scope}.inviteParticipantsButtonTitle`,
    defaultMessage: 'Invite Participants',
  },
  inviteParticipantsModalTitle: {
    id: `${scope}.inviteParticipantsModalTitle`,
    defaultMessage: 'Invite participants',
  },
  sessionSelectLabel: {
    id: `${scope}.sessionSelectLabel`,
    defaultMessage: 'Session',
  },
  sessionSelectPlaceholder: {
    id: `${scope}.sessionSelectPlaceholder`,
    defaultMessage: 'Select session',
  },
  clinicSelectLabel: {
    id: `${scope}.clinicSelectLabel`,
    defaultMessage: 'Clinic',
  },
  clinicSelectPlaceholder: {
    id: `${scope}.clinicSelectPlaceholder`,
    defaultMessage: 'Select clinic',
  },
  copyLinkIconAlt: {
    id: `${scope}.copyLinkIconAlt`,
    defaultMessage: 'Copy UTL link icon',
  },
  copyLinkButtonTitle: {
    id: `${scope}.copyLinkButtonTitle`,
    defaultMessage:
      'Copy URL link to this {isModularIntervention, select, true {intervention} false {session} other {}}',
  },
});
