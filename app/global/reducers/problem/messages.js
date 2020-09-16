/*
 * Problem Messages
 *
 * This contains all the text for the Problem saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Problem';

export default defineMessages({
  csvError: {
    id: `${scope}.csvError`,
    defaultMessage: 'Unable to generate the file',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy intervention',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder sessions in intervention',
  },
  giveUserAccessError: {
    id: `${scope}.giveUserAccessError`,
    defaultMessage: 'Cannot give user/users access to intervention',
  },
  changeAccessSettingFailure: {
    id: `${scope}.changeAccessSettingFailure`,
    defaultMessage: 'Cannot change access setting',
  },
  revokeAccessError: {
    id: `${scope}.revokeAccessError`,
    defaultMessage: 'Cannot revoke user access to intervention',
  },
  sendInviteSuccess: {
    id: `${scope}.sendInviteSuccess`,
    defaultMessage:
      'The request to send the invitation has been successfully created. We will send an email soon.',
  },
  sendInviteError: {
    id: `${scope}.sendInviteError`,
    defaultMessage: 'Unable to send the invitation',
  },
});
