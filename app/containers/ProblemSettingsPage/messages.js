/*
 * ProblemSettingsPage Messages
 *
 * This contains all the text for the ProblemSettingsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProblemSettingsPage';

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
    defaultMessage: 'Anyone with the link can access sessions',
  },
  anyoneWhoIsARegisteredParticipantLabel: {
    id: `${scope}.anyoneWhoIsARegisteredParticipantLabel`,
    defaultMessage:
      'Anyone who is a registered participant can access sessions',
  },
  onlyInvitedRegisteredParticipantsLabel: {
    id: `${scope}.onlyInvitedRegisteredParticipantsLabel`,
    defaultMessage: 'Only selected registered participants can access sessions',
  },
  anyoneWithTheLinkSublabel: {
    id: `${scope}.anyoneWithTheLinkSublabel`,
    defaultMessage:
      'It means that any person is able to complete the session. However please note, <span style="color:#EF462F;">that branching and multisessions sequences are not possible in this case.</span>',
  },
  anyoneWhoIsARegisterdParticipantSublabel: {
    id: `${scope}.anyoneWhoIsARegisterdParticipantSublabel`,
    defaultMessage:
      'It means that in order to open the session participant would need to log in or create the account.',
  },
  onlyInvitedRegisteredParticipantsSublabel: {
    id: `${scope}.onlyInvitedRegisteredParticipantsSublabel`,
    defaultMessage:
      'It means that in order to open the session participant would need to log in or create the account. Please note that <b>only participants who are listed below will be able to complete the session.</b>',
  },
  accessGiverHeader: {
    id: `${scope}.accessGiverHeader`,
    defaultMessage:
      'Select participants who can open this intervention’s sessions',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage:
      'Enter e-mail addresses of participants who can open this intervention’s sessions',
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
});
