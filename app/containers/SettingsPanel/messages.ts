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
  useNavigator: {
    id: `${scope}.useNavigator`,
    defaultMessage: 'Use Navigator',
  },
  useNavigatorSettings: {
    id: `${scope}.useNavigatorSettings`,
    defaultMessage: 'Use Navigator - Settings',
  },
  navigators: {
    id: `${scope}.navigators`,
    defaultMessage: 'Navigators',
  },
  noNavigator: {
    id: `${scope}.noNavigator`,
    defaultMessage: 'No Navigator available',
  },
  helpingMaterials: {
    id: `${scope}.helpingMaterials`,
    defaultMessage: 'Helping materials',
  },
  notifyNavigator: {
    id: `${scope}.notifyNavigator`,
    defaultMessage: `Notify navigator about new messages even then it won't be online`,
  },
  notifyByEmail: {
    id: `${scope}.notifyByEmail`,
    defaultMessage: 'Notify by e-mail',
  },
  notifyBySms: {
    id: `${scope}.notifyBySms`,
    defaultMessage: 'Notify by SMS',
  },
});
