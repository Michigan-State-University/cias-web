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
  testParticipantsTab: {
    id: `${scope}.testParticipantsTab`,
    defaultMessage: `Test participants`,
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
  uploadPredefinedParticipantsButtonTitle: {
    id: `${scope}.uploadPredefinedParticipantsButtonTitle`,
    defaultMessage: `Upload predefined participants`,
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
  predefinedParticipantsUploadLabel: {
    id: `${scope}.predefinedParticipantsUploadLabel`,
    defaultMessage: 'Upload predefined participants',
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
  phoneInputLabel: {
    id: `${scope}.phoneInputLabel`,
    defaultMessage: `Phone`,
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
  uploadPredefinedParticipantsInfo: {
    id: `${scope}.uploadPredefinedParticipantsInfo`,
    defaultMessage:
      'Upload a CSV file containing predefined participant information. Download the example file to see the required format. The template includes columns for RA session questions that have variables assigned. The import runs in the background — CIAS will send you an e-mail when this process has been finished.',
  },
  uploadPredefinedParticipantsRaDataInfo: {
    id: `${scope}.uploadPredefinedParticipantsRaDataInfo`,
    defaultMessage:
      'All variables must have data before the RA session can close, allowing the participant to proceed with Session 1. If some data might be unknown or missing, please include an "unknown" or "not available" response option for that variable.',
  },
  examplePredefinedParticipantsCsvFilename: {
    id: `${scope}.examplePredefinedParticipantsCsvFilename`,
    defaultMessage: `{name}-predefined-participants-example`,
  },
  reviewPredefinedParticipants: {
    id: `${scope}.reviewPredefinedParticipants`,
    defaultMessage: `Review {count} predefined {count, plural, one {participant} other {participants}}`,
  },
  createPredefinedParticipants: {
    id: `${scope}.createPredefinedParticipants`,
    defaultMessage: `Create {count} {count, plural, one {participant} other {participants}}`,
  },
  participantNumber: {
    id: `${scope}.participantNumber`,
    defaultMessage: `Participant #{number}`,
  },
  bulkUploadPredefinedParticipants: {
    id: `${scope}.bulkUploadPredefinedParticipants`,
    defaultMessage: `Bulk Upload via CSV`,
  },
  removeParticipantRow: {
    id: `${scope}.removeParticipantRow`,
    defaultMessage: 'Remove',
  },
  removeAllParticipants: {
    id: `${scope}.removeAllParticipants`,
    defaultMessage: 'Remove all participants',
  },
  csvParsingError: {
    id: `${scope}.csvParsingError`,
    defaultMessage:
      'An error occurred while parsing the CSV file. Please check the file format and try again.',
  },
  csvInvalidPhoneNumbers: {
    id: `${scope}.csvInvalidPhoneNumbers`,
    defaultMessage:
      '{count, plural, one {# phone number} other {# phone numbers}} could not be parsed due to invalid country code or phone number format.',
  },
  healthClinicColumnHeader: {
    id: `${scope}.healthClinicColumnHeader`,
    defaultMessage: 'Health Clinic',
  },
  healthSystemColumnHeader: {
    id: `${scope}.healthSystemColumnHeader`,
    defaultMessage: 'Health System',
  },
  csvInvalidHealthClinicIds: {
    id: `${scope}.csvInvalidHealthClinicIds`,
    defaultMessage:
      '{count, plural, one {# health clinic ID was} other {# health clinic IDs were}} not recognized and cleared. Please verify the health clinic assignments.',
  },
  noHealthClinicAssigned: {
    id: `${scope}.noHealthClinicAssigned`,
    defaultMessage: 'No clinic',
  },
  raSessionColumnHeader: {
    id: `${scope}.raSessionColumnHeader`,
    defaultMessage: 'RA Session',
  },
  fillRaSessionButton: {
    id: `${scope}.fillRaSessionButton`,
    defaultMessage: 'Fill RA Session',
  },
  fillRaSessionDisabledInfo: {
    id: `${scope}.fillRaSessionDisabledInfo`,
    defaultMessage:
      'The RA session can only be filled once the intervention is published.',
  },
  raSessionCompleted: {
    id: `${scope}.raSessionCompleted`,
    defaultMessage: 'Completed',
  },
  raSessionLabel: {
    id: `${scope}.raSessionLabel`,
    defaultMessage: 'Research Assistant Session',
  },
  raSessionCompletedInfo: {
    id: `${scope}.raSessionCompletedInfo`,
    defaultMessage: 'Completed on {date} by {email}',
  },
  raSessionPending: {
    id: `${scope}.raSessionPending`,
    defaultMessage: 'Not completed yet',
  },
  csvUnknownRaAnswerColumn: {
    id: `${scope}.csvUnknownRaAnswerColumn`,
    defaultMessage:
      "{count, plural, one {# CSV column} other {# CSV columns}} don't match any RA-session variable and were ignored.",
  },
  csvRaAnswerTypeMismatch: {
    id: `${scope}.csvRaAnswerTypeMismatch`,
    defaultMessage:
      '{count, plural, one {# answer value has} other {# answer values have}} the wrong type for its question.',
  },
  raAnswersInfoBanner: {
    id: `${scope}.raAnswersInfoBanner`,
    defaultMessage:
      'This CSV includes RA-session answer columns. The columns below are read-only - to change an answer, edit the CSV and re-upload.',
  },
  raAnswersRequirePublishedBlockBanner: {
    id: `${scope}.raAnswersRequirePublishedBlockBanner`,
    defaultMessage:
      'This CSV includes RA-session answers, but the intervention is not published yet. Please publish the intervention or remove the RA answer values from the CSV before importing.',
  },
  bulkCreateErrorListHeader: {
    id: `${scope}.bulkCreateErrorListHeader`,
    defaultMessage:
      '{count, plural, one {# issue to fix before importing:} other {# issues to fix before importing:}}',
  },
  rowNumberColumnHeader: {
    id: `${scope}.rowNumberColumnHeader`,
    defaultMessage: '#',
  },
  copyInterventionTestLinkButtonTitle: {
    id: `${scope}.copyInterventionTestLinkButtonTitle`,
    defaultMessage: 'Copy test link to this intervention',
  },
  copySessionTestLinkButtonTitle: {
    id: `${scope}.copySessionTestLinkButtonTitle`,
    defaultMessage: 'Copy test link to this session',
  },
  copyTestLinkIconAlt: {
    id: `${scope}.copyTestLinkIconAlt`,
    defaultMessage: 'Copy test link icon',
  },
  copyTestLinkCopied: {
    id: `${scope}.copyTestLinkCopied`,
    defaultMessage: 'Copied!',
  },
  copyTestLinkSuccess: {
    id: `${scope}.copyTestLinkSuccess`,
    defaultMessage:
      'Test link copied. It works until {expiresAt}. Open it in a private/incognito window.',
  },
  copyTestLinkSuccessUnknownExpiry: {
    id: `${scope}.copyTestLinkSuccessUnknownExpiry`,
    defaultMessage:
      'Test link copied. It works for a few minutes. Open it in a private/incognito window.',
  },
  copyTestLinkClipboardError: {
    id: `${scope}.copyTestLinkClipboardError`,
    defaultMessage:
      'The test link could not be copied to your clipboard. Please try again.',
  },
  copyTestLinkHint: {
    id: `${scope}.copyTestLinkHint`,
    defaultMessage:
      'A test link marks the participant it creates as test data; their fill is deleted automatically about 24 hours later, together with its contribution to the relevant charts. Open it in a private or incognito window and complete the fill in that tab.',
  },
  lastReminderColumnHeader: {
    id: `${scope}.lastReminderColumnHeader`,
    defaultMessage: 'Last reminder',
  },
  sendSmsInvitationButtonTitle: {
    id: `${scope}.sendSmsInvitationButtonTitle`,
    defaultMessage: 'Send SMS invitation',
  },
  sendSmsReminderButtonTitle: {
    id: `${scope}.sendSmsReminderButtonTitle`,
    defaultMessage: 'Send reminder',
  },
  smsCampaignNotPublishedInfo: {
    id: `${scope}.smsCampaignNotPublishedInfo`,
    defaultMessage: 'Available once the intervention is published.',
  },
  smsCampaignNotPublishedError: {
    id: `${scope}.smsCampaignNotPublishedError`,
    defaultMessage:
      'This intervention is not published, so no SMS can be sent right now.',
  },
  smsCampaignNotEditorInfo: {
    id: `${scope}.smsCampaignNotEditorInfo`,
    defaultMessage:
      'Available to the current editor of this intervention only.',
  },
  smsCampaignNoInvitedParticipantsInfo: {
    id: `${scope}.smsCampaignNoInvitedParticipantsInfo`,
    defaultMessage:
      'Available once at least one participant has received an SMS invitation.',
  },
  smsCampaignInvitationRecipientsInfo: {
    id: `${scope}.smsCampaignInvitationRecipientsInfo`,
    defaultMessage:
      'The invitation goes to every active participant with a phone number who has not received an SMS invitation yet.',
  },
  smsCampaignReminderRecipientsInfo: {
    id: `${scope}.smsCampaignReminderRecipientsInfo`,
    defaultMessage:
      'The reminder goes out immediately to every invited participant who has not completed the intervention yet.',
  },
  smsCampaignInvitationBodyLabel: {
    id: `${scope}.smsCampaignInvitationBodyLabel`,
    defaultMessage: 'Invitation message',
  },
  smsCampaignReminderBodyLabel: {
    id: `${scope}.smsCampaignReminderBodyLabel`,
    defaultMessage: 'Reminder message',
  },
  smsCampaignBodyPlaceholder: {
    id: `${scope}.smsCampaignBodyPlaceholder`,
    defaultMessage: 'Write the message participants will receive…',
  },
  smsCampaignPersonalLinkHint: {
    id: `${scope}.smsCampaignPersonalLinkHint`,
    defaultMessage:
      "Each participant's personal link is added at the end automatically.",
  },
  smsCampaignCounter: {
    id: `${scope}.smsCampaignCounter`,
    defaultMessage:
      '{length}/{maxLength} characters · {segments} SMS ({encoding})',
  },
  smsCampaignNonGsm7WarningHeader: {
    id: `${scope}.smsCampaignNonGsm7WarningHeader`,
    defaultMessage: 'This message will be sent as Unicode',
  },
  smsCampaignNonGsm7Warning: {
    id: `${scope}.smsCampaignNonGsm7Warning`,
    defaultMessage:
      'Unicode encoding more than halves how much text fits in a single SMS.',
  },
  smsCampaignNonGsm7FixableHint: {
    id: `${scope}.smsCampaignNonGsm7FixableHint`,
    defaultMessage: 'These can be swapped for GSM-7 equivalents:',
  },
  smsCampaignNonGsm7NoFixHint: {
    id: `${scope}.smsCampaignNonGsm7NoFixHint`,
    defaultMessage:
      'Some of them have no safe equivalent — a letter with a diacritic or an emoji can only be removed by hand, because replacing it would change what the message says.',
  },
  smsCampaignNonGsm7FixButton: {
    id: `${scope}.smsCampaignNonGsm7FixButton`,
    defaultMessage: 'Replace with GSM-7 equivalents',
  },
  smsCampaignNonGsm7SpaceLabel: {
    id: `${scope}.smsCampaignNonGsm7SpaceLabel`,
    defaultMessage: 'blank space',
  },
  smsCampaignNonGsm7TabLabel: {
    id: `${scope}.smsCampaignNonGsm7TabLabel`,
    defaultMessage: 'tab',
  },
  smsCampaignNonGsm7ZeroWidthLabel: {
    id: `${scope}.smsCampaignNonGsm7ZeroWidthLabel`,
    defaultMessage: 'invisible character',
  },
  smsCampaignAddReminderLabel: {
    id: `${scope}.smsCampaignAddReminderLabel`,
    defaultMessage: 'Add a reminder sent automatically after a few days',
  },
  smsCampaignDaysAfterLabel: {
    id: `${scope}.smsCampaignDaysAfterLabel`,
    defaultMessage: 'Send after (days)',
  },
  smsCampaignDaysAfterHint: {
    id: `${scope}.smsCampaignDaysAfterHint`,
    defaultMessage:
      'Between 1 and {max}. It goes out at the same time of day as the invitation, only to participants who have not opened their link.',
  },
  smsCampaignSendInvitationSubmit: {
    id: `${scope}.smsCampaignSendInvitationSubmit`,
    defaultMessage: 'Send invitation',
  },
  smsCampaignSendReminderSubmit: {
    id: `${scope}.smsCampaignSendReminderSubmit`,
    defaultMessage: 'Send reminder',
  },
  smsCampaignSendInvitationConfirmationTitle: {
    id: `${scope}.smsCampaignSendInvitationConfirmationTitle`,
    defaultMessage: 'Send the SMS invitation campaign?',
  },
  smsCampaignSendInvitationConfirmationContent: {
    id: `${scope}.smsCampaignSendInvitationConfirmationContent`,
    defaultMessage:
      '{count, plural, =0 {The message will be sent to every active participant with a phone number who has not received an SMS invitation yet.} one {The message will be sent to up to # participant: every active participant with a phone number who has not received an SMS invitation yet. The actual number may be lower - participants who opted out of SMS or whose number cannot receive messages are skipped.} other {The message will be sent to up to # participants: every active participant with a phone number who has not received an SMS invitation yet. The actual number may be lower - participants who opted out of SMS or whose number cannot receive messages are skipped.}} This cannot be undone once sending starts.',
  },
  smsCampaignSendReminderConfirmationTitle: {
    id: `${scope}.smsCampaignSendReminderConfirmationTitle`,
    defaultMessage: 'Send the SMS reminder campaign?',
  },
  smsCampaignSendReminderConfirmationContent: {
    id: `${scope}.smsCampaignSendReminderConfirmationContent`,
    defaultMessage:
      '{count, plural, =0 {The message will be sent to every invited participant who has not completed the intervention yet and has not had a reminder in the last 24 hours.} one {The message will be sent to up to # participant: every invited participant who has not completed the intervention yet and has not had a reminder in the last 24 hours. The actual number may be lower - participants who already completed the intervention, opted out of SMS or whose number cannot receive messages are skipped.} other {The message will be sent to up to # participants: every invited participant who has not completed the intervention yet and has not had a reminder in the last 24 hours. The actual number may be lower - participants who already completed the intervention, opted out of SMS or whose number cannot receive messages are skipped.}} This cannot be undone once sending starts.',
  },
  smsCampaignErrorListHeader: {
    id: `${scope}.smsCampaignErrorListHeader`,
    defaultMessage: 'The message could not be sent',
  },
  smsCampaignScheduledReminderErrorPrefix: {
    id: `${scope}.smsCampaignScheduledReminderErrorPrefix`,
    defaultMessage: 'Scheduled reminder: {error}',
  },
  smsCampaignRetryAfter: {
    id: `${scope}.smsCampaignRetryAfter`,
    defaultMessage: 'Try again in {seconds} s.',
  },
  smsCampaignsListEmpty: {
    id: `${scope}.smsCampaignsListEmpty`,
    defaultMessage: 'No SMS has been sent for this intervention yet.',
  },
  smsCampaignsViewSendInfo: {
    id: `${scope}.smsCampaignsViewSendInfo`,
    defaultMessage:
      'Send a new message to the predefined participants of this intervention.',
  },
  smsCampaignsSummaryNone: {
    id: `${scope}.smsCampaignsSummaryNone`,
    defaultMessage: 'No SMS sent yet.',
  },
  smsCampaignsSummaryLatest: {
    id: `${scope}.smsCampaignsSummaryLatest`,
    defaultMessage: 'Last campaign: {kind} · {status}',
  },
  smsCampaignsSummaryRecipients: {
    id: `${scope}.smsCampaignsSummaryRecipients`,
    defaultMessage: '{recipients} recipients',
  },
  smsCampaignsSummaryOpenButton: {
    id: `${scope}.smsCampaignsSummaryOpenButton`,
    defaultMessage: 'SMS campaigns',
  },
  smsCampaignsListHeader: {
    id: `${scope}.smsCampaignsListHeader`,
    defaultMessage: 'SMS campaigns',
  },
  smsCampaignKindColumnHeader: {
    id: `${scope}.smsCampaignKindColumnHeader`,
    defaultMessage: 'Type',
  },
  smsCampaignDateColumnHeader: {
    id: `${scope}.smsCampaignDateColumnHeader`,
    defaultMessage: 'Date',
  },
  smsCampaignRecipientsColumnHeader: {
    id: `${scope}.smsCampaignRecipientsColumnHeader`,
    defaultMessage: 'Recipients',
  },
  smsCampaignKindValue: {
    id: `${scope}.smsCampaignKindValue`,
    defaultMessage:
      '{kind, select, invitation {Invitation} manual_reminder {Reminder} scheduled_reminder {Scheduled reminder} other {Campaign}}',
  },
  smsCampaignStatusValue: {
    id: `${scope}.smsCampaignStatusValue`,
    defaultMessage:
      '{status, select, scheduled {Scheduled} sending {Sending} sent {Sent} failed {Failed} cancelled {Cancelled} skipped {Skipped} other {Unknown}}',
  },
  smsCampaignScheduledAtProvisional: {
    id: `${scope}.smsCampaignScheduledAtProvisional`,
    defaultMessage: '(approximate)',
  },
  smsCampaignRecipientsValue: {
    id: `${scope}.smsCampaignRecipientsValue`,
    defaultMessage: '{recipients} · {accepted} sent, {failed} failed',
  },
  smsCampaignRecipientsResolvedAtSendTime: {
    id: `${scope}.smsCampaignRecipientsResolvedAtSendTime`,
    defaultMessage: 'Decided when it is sent',
  },
  smsCampaignPreviewHeader: {
    id: `${scope}.smsCampaignPreviewHeader`,
    defaultMessage: 'Message',
  },
  smsCampaignShowPreviewLabel: {
    id: `${scope}.smsCampaignShowPreviewLabel`,
    defaultMessage: 'Show the message',
  },
  smsCampaignHidePreviewLabel: {
    id: `${scope}.smsCampaignHidePreviewLabel`,
    defaultMessage: 'Hide the message',
  },
  smsCampaignMetaError: {
    id: `${scope}.smsCampaignMetaError`,
    defaultMessage: 'The message settings could not be loaded.',
  },
  smsCampaignMetaRetryButton: {
    id: `${scope}.smsCampaignMetaRetryButton`,
    defaultMessage: 'Try again',
  },
  predefinedParticipantLinkOpenedLabel: {
    id: `${scope}.predefinedParticipantLinkOpenedLabel`,
    defaultMessage: `Link opened`,
  },
  predefinedParticipantLinkNotOpened: {
    id: `${scope}.predefinedParticipantLinkNotOpened`,
    defaultMessage: `Not opened yet`,
  },
});
