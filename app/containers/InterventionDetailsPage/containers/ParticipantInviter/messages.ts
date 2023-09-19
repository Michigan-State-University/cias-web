import { defineMessages } from 'react-intl';
import { InviteParticipantModalView, ParticipantInvitationType } from './types';

export const scope =
  'app.containers.InterventionDetailsPage.containers.InviteParticipantsButton';

export default defineMessages({
  participantsInviterButtonTitle: {
    id: `${scope}.participantsInviterButtonTitle`,
    defaultMessage: 'Invite Participants',
  },
  [`viewTitle${InviteParticipantModalView.PARTICIPANT_LIST}`]: {
    id: `${scope}.viewTitle${InviteParticipantModalView.PARTICIPANT_LIST}`,
    defaultMessage: 'Invite participants',
  },
  [`viewTitle${InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS}`]: {
    id: `${scope}.viewTitle${InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS}`,
    defaultMessage: 'Invite e-mail participants',
  },
  [`viewTitle${InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT}`]: {
    id: `${scope}.viewTitle${InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT}`,
    defaultMessage: 'Invite predefined participant',
  },
  [`viewTitle${InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT}`]: {
    id: `${scope}.viewTitle${InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT}`,
    defaultMessage: 'Manage participant',
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
  backButtonTitle: {
    id: `${scope}.backButtonTitle`,
    defaultMessage: `Back to {invitationType, select, ${ParticipantInvitationType.EMAIL} {e-mail} ${ParticipantInvitationType.PREDEFINED} {predefined} other {}} participants`,
  },
  emailParticipants: {
    id: `${scope}.emailParticipants`,
    defaultMessage: `E-mail participants`,
  },
  predefinedParticipants: {
    id: `${scope}.predefinedParticipants`,
    defaultMessage: `Predefined participants`,
  },
});
