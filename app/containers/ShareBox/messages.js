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
    defaultMessage: 'Share Intervention with Participants',
  },
  tooltipSelectorContent: {
    id: `${scope}.tooltipSelectorContent`,
    defaultMessage:
      'It means that any person who click the link will be able to complete the session. However please note, that people who starts session with the link and are not listed below won’t be able to use the branching and multisessions sequences.',
  },
  selectLabel: {
    id: `${scope}.selectLabel`,
    defaultMessage: 'Select Starting Session',
  },
  tooltipSelectContent: {
    id: `${scope}.tooltipSelectContent`,
    defaultMessage:
      'Participants will be able to take part in the intervention from this particular session',
  },
  inviteLabel: {
    id: `${scope}.inviteLabel`,
    defaultMessage: 'Invite Participants',
  },
  tooltipInviterContent: {
    id: `${scope}.tooltipInviterContent`,
    defaultMessage:
      'These people will be invited to take part in the intervention and answer the selected session',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Participants emails',
  },
  uploadText: {
    id: `${scope}.uploadText`,
    defaultMessage: 'Upload e-mails with CVS file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Send invite',
  },
  copyLabel: {
    id: `${scope}.copyLabel`,
    defaultMessage: 'Copy link to this session and share it with participants',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
  resend: {
    id: `${scope}.resend`,
    defaultMessage: 'Resend invite',
  },
});
