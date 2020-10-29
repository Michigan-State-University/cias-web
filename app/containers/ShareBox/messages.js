/*
 * ShareBox Messages
 *
 * This contains all the text for the ShareBox container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ShareBox';

export default defineMessages({
  tooltipSelectorContent: {
    id: `${scope}.tooltipSelectorContent`,
    defaultMessage:
      'It means that any person who click the link will be able to complete the session. However please note, that people who starts session with the link and are not listed below won’t be able to use the branching and multisessions sequences.',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Enter emails to send link to this session',
  },
  uploadText: {
    id: `${scope}.uploadText`,
    defaultMessage: 'Upload emails with CSV file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Send an email',
  },
  copyLabel: {
    id: `${scope}.copyLabel`,
    defaultMessage: 'Copy link to start with this session externaly',
  },
  resend: {
    id: `${scope}.resend`,
    defaultMessage: 'Resend email',
  },
  userListLabel: {
    id: `${scope}.userListLabel`,
    defaultMessage: 'Email has been already sent to',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Email is invalid!',
  },
  duplicatedEmail: {
    id: `${scope}.duplicatedEmail`,
    defaultMessage: 'Such email is already provided!',
  },
  filename: {
    id: `${scope}.filename`,
    defaultMessage: 'participants_emails_{interventionName}_invite',
  },
  exportCsv: {
    id: `${scope}.exportCsv`,
    defaultMessage: 'Export emails to CSV file',
  },
});
