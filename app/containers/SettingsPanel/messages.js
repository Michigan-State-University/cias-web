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
      '<b>Anyone with the link</b> can access the session. Responses will be <b>anonymous</b> - therefore branching between sessions is <b>not</b> supported.',
  },
  anyoneWhoIsARegisterdParticipantSublabel: {
    id: `${scope}.anyoneWhoIsARegisterdParticipantSublabel`,
    defaultMessage:
      'To access the session, participants must <b>create</b> or <b>have</b> a <b>CIAS account.</b>',
  },
  onlyInvitedRegisteredParticipantsSublabel: {
    id: `${scope}.onlyInvitedRegisteredParticipantsSublabel`,
    defaultMessage:
      'Participants can only access the session <b>if access is granted</b> by entering their email address below. Participants must also <b>create</b> or <b>have</b> a <b>CIAS account.</b>',
  },
  accessGiverHeader: {
    id: `${scope}.accessGiverHeader`,
    defaultMessage:
      'Enter emails to grant participants access to the intervention. ',
  },
  accessGiverHeaderNote: {
    id: `${scope}.accessGiverHeaderNote`,
    defaultMessage:
      '<b>Note:</b> this action does not send session invites to participants',
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
});
