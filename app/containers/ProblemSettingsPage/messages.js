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
    id: `${scope}.anyoneWithTheLink`,
    defaultMessage: 'Anyone with the link can access sessions',
  },
  anyoneWhoIsARegisterdParticipantLabel: {
    id: `${scope}.anyoneWhoIsARegisterdParticipant`,
    defaultMessage:
      'Anyone who is a registered participant can access sessions',
  },
  onlyInvitedRegisteredParticipantsLabel: {
    id: `${scope}.onlyInvitedRegisteredParticipants`,
    defaultMessage: 'Only invited registered participants can access sessions',
  },
  anyoneWithTheLinkSublabel: {
    id: `${scope}.anyoneWithTheLink`,
    defaultMessage:
      'It means that any person is able to complete the session. However please note, <span style="color:#EF462F;">that branching and multisessions sequences are not possible in this case.</span>',
  },
  anyoneWhoIsARegisterdParticipantSublabel: {
    id: `${scope}.anyoneWhoIsARegisterdParticipant`,
    defaultMessage:
      'It means that in order to open the session participant would need to log in or create the account.',
  },
  onlyInvitedRegisteredParticipantsSublabel: {
    id: `${scope}.onlyInvitedRegisteredParticipants`,
    defaultMessage:
      'It means that in order to open the session participant would need to log in or create the account. Please note that <b>only particpants who are listed below will be able to complete the session.</b>',
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
    defaultMessage: 'Upload e-mails with CVS file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Enable access',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
});
