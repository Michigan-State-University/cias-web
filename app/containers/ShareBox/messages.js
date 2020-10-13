/*
 * ShareBox Messages
 *
 * This contains all the text for the ShareBox container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ShareBox';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Invite to start intervention from:',
  },
  tooltipSelectorContent: {
    id: `${scope}.tooltipSelectorContent`,
    defaultMessage:
      'It means that any person who click the link will be able to complete the session. However please note, that people who starts session with the link and are not listed below won’t be able to use the branching and multisessions sequences.',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Invite new participants with e-mails',
  },
  uploadText: {
    id: `${scope}.uploadText`,
    defaultMessage: 'Upload e-mails with CSV file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Send invite',
  },
  copyLabel: {
    id: `${scope}.copyLabel`,
    defaultMessage: 'Copy link and invite to start with this session externaly',
  },
  resend: {
    id: `${scope}.resend`,
    defaultMessage: 'Resend invite',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
  userListLabel: {
    id: `${scope}.userListLabel`,
    defaultMessage: 'Invite has beed already sent to',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Email is invalid!',
  },
  duplicatedEmail: {
    id: `${scope}.duplicatedEmail`,
    defaultMessage: 'Such email is already provided!',
  },
});
