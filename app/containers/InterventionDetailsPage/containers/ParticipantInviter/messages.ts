import { defineMessages } from 'react-intl';
import { ParticipantInvitationType } from './types';

export const scope =
  'app.containers.InterventionDetailsPage.containers.InviteParticipantsButton';

export default defineMessages({
  participantsInviterButtonTitle: {
    id: `${scope}.participantsInviterButtonTitle`,
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
  noParticipantsInfo: {
    id: `${scope}.noParticipantsInfo`,
    defaultMessage: `There are no {invitationType, select, ${ParticipantInvitationType.EMAIL} {e-mail} ${ParticipantInvitationType.PREDEFINED} {predefined} other {}} participants yet`,
  },
  inviteParticipantsButtonTitle: {
    id: `${scope}.inviteParticipantsButtonTitle`,
    defaultMessage: `Invite {invitationType, select, ${ParticipantInvitationType.EMAIL} {e-mail} ${ParticipantInvitationType.PREDEFINED} {predefined} other {}} participants`,
  },
});
