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
    defaultMessage: 'Create predefined participant',
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
    defaultMessage: `{invitationType, select, ${ParticipantInvitationType.EMAIL} {Invite e-mail participants} ${ParticipantInvitationType.PREDEFINED} {Create predefined participant} other {}}`,
  },
  backButtonTitle: {
    id: `${scope}.backButtonTitle`,
    defaultMessage: `Back to {invitationType, select, ${ParticipantInvitationType.EMAIL} {e-mail} ${ParticipantInvitationType.PREDEFINED} {predefined} other {}} participants list`,
  },
  emailParticipantsTab: {
    id: `${scope}.emailParticipantsTab`,
    defaultMessage: `E-mail participants`,
  },
  predefinedParticipantsTab: {
    id: `${scope}.predefinedParticipantsTab`,
    defaultMessage: `Predefined participants`,
  },
  inviteEmailParticipantSubmitButtonTitle: {
    id: `${scope}.inviteEmailParticipantSubmitButtonTitle`,
    defaultMessage: `Send invitations`,
  },
  createPredefinedParticipantSubmitButtonTitle: {
    id: `${scope}.createPredefinedParticipantSubmitButtonTitle`,
    defaultMessage: `Create participant`,
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
  predefinedParticipantsInfo: {
    id: `${scope}.predefinedParticipantsInfo`,
    defaultMessage: `For security reasons, predefined participants won't see Participant Report screen, thus receive PDF reports.`,
  },
  firstNameInputLabel: {
    id: `${scope}.firstNameInputLabel`,
    defaultMessage: `First name`,
  },
  firstNameInputPlaceholder: {
    id: `${scope}.firstNameInputPlaceholder`,
    defaultMessage: `Enter participant first name`,
  },
  lastNameInputLabel: {
    id: `${scope}.lastNameInputLabel`,
    defaultMessage: `Last name`,
  },
  lastNameInputPlaceholder: {
    id: `${scope}.lastNameInputPlaceholder`,
    defaultMessage: `Enter participant last name`,
  },
  emailInputLabel: {
    id: `${scope}.emailInputLabel`,
    defaultMessage: `E-mail`,
  },
  emailInputPlaceholder: {
    id: `${scope}.emailInputPlaceholder`,
    defaultMessage: `Enter participant e-mail`,
  },
  externalIdInputLabel: {
    id: `${scope}.externalIdInputLabel`,
    defaultMessage: `Participant ID`,
  },
  externalIdInputPlaceholder: {
    id: `${scope}.externalIdInputPlaceholder`,
    defaultMessage: `Enter participant ID`,
  },
});
