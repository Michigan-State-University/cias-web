import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.InterventionDetailsPage.containers.InviteParticipantsButton';

export default defineMessages({
  participantsInviterButtonTitle: {
    id: `${scope}.participantsInviterButtonTitle`,
    defaultMessage: 'Invite Participants',
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
    defaultMessage: 'Copy URL link icon',
  },
  copyLinkButtonTitle: {
    id: `${scope}.copyLinkButtonTitle`,
    defaultMessage:
      'Copy URL link to this {isModularIntervention, select, true {intervention} false {session} other {}}',
  },
  copyInterventionLinkButtonTitle: {
    id: `${scope}.copyInterventionLinkButtonTitle`,
    defaultMessage: 'Copy URL link to this intervention',
  },
  copySessionLinkButtonTitle: {
    id: `${scope}.copySessionLinkButtonTitle`,
    defaultMessage: 'Copy URL link to this session',
  },
  noParticipantsInfo: {
    id: `${scope}.noParticipantsInfo`,
    defaultMessage: `There are no {invitationType, select, EMAIL {e-mail} PREDEFINED {predefined} other {}} participants yet`,
  },
  inviteParticipantsButtonTitle: {
    id: `${scope}.inviteParticipantsButtonTitle`,
    defaultMessage: `{invitationType, select, EMAIL {Invite e-mail participants} PREDEFINED {Create predefined participant} other {}}`,
  },
  backButtonTitle: {
    id: `${scope}.backButtonTitle`,
    defaultMessage: `Back to {invitationType, select, EMAIL {e-mail} PREDEFINED {predefined} other {}} participants list`,
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
  predefinedParticipantFormSubmitButtonTitle: {
    id: `${scope}.predefinedParticipantFormSubmitButtonTitle`,
    defaultMessage: `{mode, select, CREATE {Create participant} UPDATE {Save changes} other {}}`,
  },
  invitingEmailsParticipantsNotPossibleMessage: {
    id: `${scope}.invitingEmailsParticipantsNotPossibleMessage`,
    defaultMessage: `Email participants can be invited to published interventions only`,
  },
  creatingPredefinedParticipantsNotPossibleMessage: {
    id: `${scope}.creatingPredefinedParticipantsNotPossibleMessage`,
    defaultMessage: `Predefined participants can be created in draft and published interventions only`,
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
  emailNotificationCheckboxLabel: {
    id: `${scope}.emailNotificationCheckboxLabel`,
    defaultMessage: `Allow e-mail notifications`,
  },
  smsNotificationCheckboxLabel: {
    id: `${scope}.smsNotificationCheckboxLabel`,
    defaultMessage: `Allow SMS notifications`,
  },
  externalIdInputPlaceholder: {
    id: `${scope}.externalIdInputPlaceholder`,
    defaultMessage: `Enter participant ID`,
  },
  statusColumnHeader: {
    id: `${scope}.statusColumnHeader`,
    defaultMessage: `Status`,
  },
  invitationColumnHeader: {
    id: `${scope}.invitationColumnHeader`,
    defaultMessage: `Invitation sent`,
  },
  statusColumnValue: {
    id: `${scope}.statusColumnValue`,
    defaultMessage: `{active, select, true {Active} false {Deactivated} other {}}`,
  },
  invitationColumnValue: {
    id: `${scope}.invitationColumnValue`,
    defaultMessage: `{invitationSent, select, true {Yes} false {No} other {}}`,
  },
  managePredefinedParticipantButtonLabel: {
    id: `${scope}.managePredefinedParticipantButtonLabel`,
    defaultMessage: `Manage`,
  },
  editDetailsButtonTitle: {
    id: `${scope}.editDetailsButtonTitle`,
    defaultMessage: `Edit details`,
  },
  copyPredefinedParticipanyUrlButtonTitle: {
    id: `${scope}.copyPredefinedParticipanyUrlButtonTitle`,
    defaultMessage: `Copy predefined participant invitation URL`,
  },
  predefinedParticipantLinkLabel: {
    id: `${scope}.predefinedParticipantLinkLabel`,
    defaultMessage: `Invitation URL:`,
  },
  deactivatePredefinedParticipantButtonTitle: {
    id: `${scope}.deactivatePredefinedParticipantButtonTitle`,
    defaultMessage: `Deactivate participant`,
  },
  activatePredefinedParticipantButtonTitle: {
    id: `${scope}.activatePredefinedParticipantButtonTitle`,
    defaultMessage: `Reactivate participant`,
  },
  predefinedParticipantInvitationLabel: {
    id: `${scope}.predefinedParticipantInvitationLabel`,
    defaultMessage: `Participant invitation`,
  },
  predefinedParticipantSmsAndEmailInvitationSent: {
    id: `${scope}.predefinedParticipantSmsAndEmailInvitationSent`,
    defaultMessage: `Invitation sent by SMS ({smsDate}) and e-mail ({emailDate})`,
  },

  predefinedParticipantSmsInvitationSent: {
    id: `${scope}.predefinedParticipantSmsInvitationSent`,
    defaultMessage: `Invitation sent by SMS ({smsDate})`,
  },

  predefinedParticipantEmailInvitationSent: {
    id: `${scope}.predefinedParticipantEmailInvitationSent`,
    defaultMessage: `Invitation sent by e-mail ({emailDate})`,
  },
  predefinedParticipantInvitationNotSent: {
    id: `${scope}.predefinedParticipantInvitationNotSent`,
    defaultMessage: `This participant didn’t receive an invitation yet`,
  },
  predefinedParticipantSendSmsInvitationButtonTitle: {
    id: `${scope}.predefinedParticipantSendSmsInvitationButtonTitle`,
    defaultMessage: `Send SMS invitation`,
  },
  predefinedParticipantResendSmsInvitationButtonTitle: {
    id: `${scope}.predefinedParticipantResendSmsInvitationButtonTitle`,
    defaultMessage: `Resend SMS invitation`,
  },
  predefinedParticipantSendEmailInvitationButtonTitle: {
    id: `${scope}.predefinedParticipantSendEmailInvitationButtonTitle`,
    defaultMessage: `Send e-mail invitation`,
  },
  predefinedParticipantResendEmailInvitationButtonTitle: {
    id: `${scope}.predefinedParticipantResendEmailInvitationButtonTitle`,
    defaultMessage: `Resend e-mail invitation`,
  },
});
