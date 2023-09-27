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
  [`viewTitle${InviteParticipantModalView.UPLOAD_EMAILS}`]: {
    id: `${scope}.viewTitle${InviteParticipantModalView.UPLOAD_EMAILS}`,
    defaultMessage: 'Bulk e-mail upload',
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
  inviteEmailParticipantSubmitButtonTitle: {
    id: `${scope}.inviteEmailParticipantSubmitButtonTitle`,
    defaultMessage: `Send invitations`,
  },
  invitingEmailsParticipantsNotPossibleMessage: {
    id: `${scope}.invitingEmailsParticipantsNotPossibleMessage`,
    defaultMessage: `Email participants can be invited to published interventions only`,
  },
  emailsInputLabel: {
    id: `${scope}.emailsInputLabel`,
    defaultMessage: `E-mail address`,
  },
  emailsInputPlaceholder: {
    id: `${scope}.emailsInputPlaceholder`,
    defaultMessage: `Enter participant e-mails (as many as needed)`,
  },
  participantColumnHeader: {
    id: `${scope}.participantColumnHeader`,
    defaultMessage: `Participant`,
  },
  invitationsColumnHeader: {
    id: `${scope}.invitationsColumnHeader`,
    defaultMessage: `Invitations`,
  },
  resendInvitationButtonLabel: {
    id: `${scope}.resendInvitationButtonLabel`,
    defaultMessage: `Resend invitation`,
  },
  sessionInvitationsCountTitle: {
    id: `${scope}.sessionInvitationsCountTitle`,
    defaultMessage: `This participant has been invited to:`,
  },
  resendDropdownTitle: {
    id: `${scope}.resendDropdownTitle`,
    defaultMessage: `Select session to resend invitation to:`,
  },
  exportDropdownTitle: {
    id: `${scope}.exportDropdownTitle`,
    defaultMessage: `Select session to export e-mail invitations from:`,
  },
  exportEmailsButtonTitle: {
    id: `${scope}.exportEmailsButtonTitle`,
    defaultMessage: `Export e-mails`,
  },
  emailsCsvFileName: {
    id: `${scope}.emailsCsvFileName`,
    defaultMessage: 'participants_emails_{name}_invite',
  },
  uploadEmailsButtonTitle: {
    id: `${scope}.uploadEmailsButtonTitle`,
    defaultMessage: `Upload e-mails`,
  },
  uploadEmailsInfo: {
    id: `${scope}.uploadEmailsInfo`,
    defaultMessage: `Upload CSV file with e-mail to upload multiple e-mails at once. To prepare correct format, use the file template.`,
  },
  exampleCsvFilename: {
    id: `${scope}.exampleCsvFilename`,
    defaultMessage: 'example_csv_{name}',
  },
  exportExampleCsv: {
    id: `${scope}.exportExampleCsv`,
    defaultMessage: 'Download CSV template',
  },
  csvUploadLabel: {
    id: `${scope}.csvUploadLabel`,
    defaultMessage: 'Upload e-mails',
  },
  addClinicButtonTitle: {
    id: `${scope}.addClinicButtonTitle`,
    defaultMessage: 'Add clinic',
  },
  removeClinicButtonTitle: {
    id: `${scope}.removeClinicButtonTitle`,
    defaultMessage: 'Remove clinic',
  },
  clinicMustBeUnique: {
    id: `${scope}.clinicMustBeUnique`,
    defaultMessage: 'Selected clinics must be unique',
  },
  healthClinicCollapseDefaultLabel: {
    id: `${scope}.healthClinicCollapseDefaultLabel`,
    defaultMessage: 'No clinic selected',
  },
  selectFirstSession: {
    id: `${scope}.selectFirstSession`,
    defaultMessage: 'Invite to the default intervention starting point',
  },
});
