/*
 * InterventionSettingsPage Messages
 *
 * This contains all the text for the InterventionSettingsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InterventionSettingsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Access Settings',
  },
  subheader: {
    id: `${scope}.subheader`,
    defaultMessage: 'Who can access this intervention?',
  },
  anyoneWithTheLinkLabel: {
    id: `${scope}.anyoneWithTheLinkLabel`,
    defaultMessage: 'Anyone with the link',
  },
  anyoneWhoIsARegisteredParticipantLabel: {
    id: `${scope}.anyoneWhoIsARegisteredParticipantLabel`,
    defaultMessage: 'Any registered participant',
  },
  onlyInvitedRegisteredParticipantsLabel: {
    id: `${scope}.onlyInvitedRegisteredParticipantsLabel`,
    defaultMessage: 'Specific registered participants',
  },
  anyoneWithTheLinkSublabel: {
    id: `${scope}.anyoneWithTheLinkSublabel`,
    defaultMessage:
      '<b>Anyone with the link</b> can access the intervention. Responses will be <b>anonymous</b> - therefore branching between sessions is <b>not</b> supported.',
  },
  anyoneWhoIsARegisterdParticipantSublabel: {
    id: `${scope}.anyoneWhoIsARegisterdParticipantSublabel`,
    defaultMessage:
      'To access the intervention, participants must <b>create</b> or <b>have</b> a <b>CIAS account.</b>',
  },
  onlyInvitedRegisteredParticipantsSublabel: {
    id: `${scope}.onlyInvitedRegisteredParticipantsSublabel`,
    defaultMessage:
      'Participants can only access the intervention <b>if access is granted</b> by entering their email address below. Participants must also <b>create</b> or <b>have</b> a <b>CIAS account.</b>',
  },
  accessGiverHeader: {
    id: `${scope}.accessGiverHeader`,
    defaultMessage:
      'Enter emails to grant participants access to the intervention. ',
  },
  accessGiverHeaderNote: {
    id: `${scope}.accessGiverHeaderNote`,
    defaultMessage:
      '<b>Note:</b> Once you complete this step, you will need to invite participants to complete the session',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'Enter e-mail addresses of participants',
  },
  uploadText: {
    id: `${scope}.uploadText`,
    defaultMessage: 'Upload e-mails with CSV file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Enable access',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
  usersWithAccessError: {
    id: `${scope}.usersWithAccessError`,
    defaultMessage: `Couldn't fetch users with access to this intervention`,
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  exportCsv: {
    id: `${scope}.exportCsv`,
    defaultMessage: 'Export e-mails to CSV file',
  },
  filename: {
    id: `${scope}.filename`,
    defaultMessage: 'participants_emails_{interventionName}_access',
  },
  logoHeader: {
    id: `${scope}.logoHeader`,
    defaultMessage: 'Put logo',
  },
  logoText: {
    id: `${scope}.logoText`,
    defaultMessage: 'If no image is provided, no logo will be displayed.',
  },
  logoDescriptionPlaceholder: {
    id: `${scope}.logoDescriptionPlaceholder`,
    defaultMessage:
      'Provide here the text describing the image for people with disabilities',
  },
  normalIntervention: {
    id: `${scope}.normalIntervention`,
    defaultMessage: 'Sequential',
  },
  flexibleIntervention: {
    id: `${scope}.flexibleIntervention`,
    defaultMessage: 'Modules - Flexible order',
  },
  fixedIntervention: {
    id: `${scope}.fixedIntervention`,
    defaultMessage: 'Modules - Fixed order',
  },
  interventionType: {
    id: `${scope}.interventionType`,
    defaultMessage: 'Multi-session flow',
  },
  normalInterventionDescription: {
    id: `${scope}.normalInterventionDescription`,
    defaultMessage:
      'Participants will be invited to one session at a time, following an order and schedule defined in advance. This type of intervention allows branching to be integrated in the sending schedule.',
  },
  flexibleInterventionDescription: {
    id: `${scope}.flexibleInterventionDescription`,
    defaultMessage:
      'Participants will see all modules at once and can choose to complete them in any order, at their own pace.',
  },
  fixedInterventionDescription: {
    id: `${scope}.fixedInterventionDescription`,
    defaultMessage:
      'Participants will see all modules at once, however the order and schedule in which the modules are available to complete will be defined in advance.',
  },
  addFilesButtonMessage: {
    id: `${scope}.addFilesButtonMessage`,
    defaultMessage: 'Add new files',
  },
  additionalText: {
    id: `${scope}.additionalText`,
    defaultMessage: 'Additional text for participants',
  },
  additionalTextPlaceholder: {
    id: `${scope}.additionalTextPlaceholder`,
    defaultMessage:
      'If you have any thoughts for participants, please type it here',
  },
  setupNavigator: {
    id: `${scope}.setupNavigator`,
    defaultMessage: 'Setup navigator',
  },
  useNavigatorSettings: {
    id: `${scope}.useNavigatorSettings`,
    defaultMessage: 'Use Navigator - Settings',
  },
  navigators: {
    id: `${scope}.navigators`,
    defaultMessage: 'Navigators',
  },
  contactInformation: {
    id: `${scope}.contactInformation`,
    defaultMessage: 'Contact information',
  },
  helpingMaterials: {
    id: `${scope}.helpingMaterials`,
    defaultMessage: 'Resources',
  },
  notifyNavigator: {
    id: `${scope}.notifyNavigator`,
    defaultMessage: `Notify navigator about new messages even then it won't be online`,
  },
  contactPrefix: {
    id: `${scope}.contactPrefix`,
    defaultMessage: 'Contact prefix',
  },
  contactPhoneNumber: {
    id: `${scope}.contactPhoneNumber`,
    defaultMessage: 'Contact phone number',
  },
  messagePrefix: {
    id: `${scope}.messagePrefix`,
    defaultMessage: 'Message prefix',
  },
  messagePhoneNumber: {
    id: `${scope}.messagePhoneNumber`,
    defaultMessage: 'Message phone number',
  },
  saveChanges: {
    id: `${scope}.saveChanges`,
    defaultMessage: 'Save changes',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'e.g. contact@cias.app',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'Contact e-mail address',
  },
  messageLabel: {
    id: `${scope}.messageLabel`,
    defaultMessage: 'Message to participant when no navigator is available',
  },
  messagePlaceholder: {
    id: `${scope}.messagePlaceholder`,
    defaultMessage:
      'e.g. Sorry, but all our navigators are busy at the moment :(',
  },
  textInformation: {
    id: `${scope}.textInformation`,
    defaultMessage: 'Text information for participant',
  },
  navigatorSetupError: {
    id: `${scope}.navigatorSetupError`,
    defaultMessage: `Couldn't fetch navigator setup`,
  },
  inviteNavigatorsByEmail: {
    id: `${scope}.inviteNavigatorsByEmail`,
    defaultMessage: `Invite navigators by e-mail`,
  },
  waitingForAcceptance: {
    id: `${scope}.waitingForAcceptance`,
    defaultMessage: `Waiting for invitation acceptance`,
  },
  navigatorEmail: {
    id: `${scope}.navigatorEmail`,
    defaultMessage: `Navigator’s e-mail address`,
  },
  navigatorExampleEmail: {
    id: `${scope}.navigatorExampleEmail`,
    defaultMessage: `e.g. john.doe@example.com`,
  },
  invite: {
    id: `${scope}.invite`,
    defaultMessage: `Invite`,
  },
  navigatorsFromTeam: {
    id: `${scope}.navigatorsFromTeam`,
    defaultMessage: `Add navigators from your team`,
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: `Add`,
  },
  navigatorsAddedToIntervention: {
    id: `${scope}.navigatorsAddedToIntervention`,
    defaultMessage: `Navigators added to this intervention`,
  },
  noAddedNavigators: {
    id: `${scope}.noAddedNavigators`,
    defaultMessage: `There are no navigators added to this intervention.`,
  },
  noTeamNavigators: {
    id: `${scope}.noTeamNavigators`,
    defaultMessage: `There are no navigators in your team that are not navigators in this intervention already.`,
  },
  participantLinks: {
    id: `${scope}.participantLinks`,
    defaultMessage: 'Links for participant',
  },
  navigatorLinks: {
    id: `${scope}.navigatorLinks`,
    defaultMessage: 'Links for navigator',
  },
  addNewLink: {
    id: `${scope}.addNewLink`,
    defaultMessage: 'Add new link',
  },
  newLink: {
    id: `${scope}.newLink`,
    defaultMessage: 'New link',
  },
  displayName: {
    id: `${scope}.displayName`,
    defaultMessage: 'Display name',
  },
  link: {
    id: `${scope}.link`,
    defaultMessage: 'Link',
  },
  linkPlaceholder: {
    id: `${scope}.linkPlaceholder`,
    defaultMessage: 'e.g. https://www.google.com/',
  },
  urlValidationError: {
    id: `${scope}.urlValidationError`,
    defaultMessage: 'This field should be a valid URL',
  },
  noLinksForParticipant: {
    id: `${scope}.noLinksForParticipant`,
    defaultMessage: `You haven’t added any links for participants yet. Let’s click on <primaryColorBold>Add new link</primaryColorBold> above to add some links.`,
  },
  noLinksForNavigator: {
    id: `${scope}.noLinksForNavigator`,
    defaultMessage: `You haven’t added any links for navigators yet. Let’s click on <primaryColorBold>Add new link</primaryColorBold> above to add some links.`,
  },
  cancelNavigatorInvitation: {
    id: `${scope}.cancelNavigatorInvitation`,
    defaultMessage: 'Cancel Navigator invitation',
  },
  importFile: {
    id: `${scope}.importFile`,
    defaultMessage: 'Import file',
  },
  filesForNavigator: {
    id: `${scope}.filesForNavigator`,
    defaultMessage: 'Files for navigator',
  },
  filesForParticipant: {
    id: `${scope}.filesForParticipant`,
    defaultMessage: 'Files for participant',
  },
  deleteFile: {
    id: `${scope}.deleteFile`,
    defaultMessage: 'Delete file',
  },
  scriptsForNavigator: {
    id: `${scope}.scriptsForNavigator`,
    defaultMessage: 'Example scripts for navigator',
  },
  downloadTemplate: {
    id: `${scope}.downloadTemplate`,
    defaultMessage: 'Download template',
  },
  filledTemplate: {
    id: `${scope}.filledTemplate`,
    defaultMessage: 'Filled template',
  },
  failedCsvValidation: {
    id: `${scope}.failedCsvValidation`,
    defaultMessage:
      'File contains errors. Fill it in according to the example.',
  },
  csvValidationError: {
    id: `${scope}.csvValidationError`,
    defaultMessage: 'An error occurred when validating a CSV file.',
  },
  navigatorScriptUploadTooltipTilte: {
    id: `${scope}.navigatorScriptUploadTooltipTilte`,
    defaultMessage: 'How script file should look like?',
  },
  navigatorScriptUploadTooltipDescription: {
    id: `${scope}.navigatorScriptUploadTooltipDescription`,
    defaultMessage:
      'Below you find a screenshot which represents correctly filled template',
  },
  configureNavigatorSettings: {
    id: `${scope}.configureNavigatorSettings`,
    defaultMessage: 'Configure navigator settings',
  },
  interventionConversationsTranscriptInfo: {
    id: `${scope}.interventionConversationsTranscriptInfo`,
    defaultMessage:
      'You can also download all conversations within this intervention. To do that please generate a transcript before you can download it.',
  },
  generateTranscript: {
    id: `${scope}.generateTranscript`,
    defaultMessage: 'Generate transcript',
  },
  generateNewTranscript: {
    id: `${scope}.generateNewTranscript`,
    defaultMessage: 'Generate new transcript',
  },
  downloadTranscript: {
    id: `${scope}.downloadTranscript`,
    defaultMessage: 'Download transcript',
  },
  contactMessagePlaceholder: {
    id: `${scope}.contactMessagePlaceholder`,
    defaultMessage: 'Specify contact message',
  },
  contactMessageLabel: {
    id: `${scope}.contactMessageLabel`,
    defaultMessage: 'Contact information message',
  },
});
