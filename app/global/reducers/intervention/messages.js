/*
 * Intervention Messages
 *
 * This contains all the text for the Intervention saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Intervention';

export default defineMessages({
  csvError: {
    id: `${scope}.csvError`,
    defaultMessage: 'Unable to generate the file',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy session',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder sessions in session',
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
  resendInviteSuccess: {
    id: `${scope}.resendInviteSuccess`,
    defaultMessage:
      'The request to resend the invitation has been successfully created. We will send an email soon.',
  },
  resendInviteError: {
    id: `${scope}.resendInviteError`,
    defaultMessage: 'Unable to resend the invitation',
  },
  deleteInviteSuccess: {
    id: `${scope}.deleteInviteSuccess`,
    defaultMessage:
      'Participant has been removed from the further delivery of e-mail notifications about next sessions',
  },
  deleteInviteError: {
    id: `${scope}.deleteInviteError`,
    defaultMessage: 'Unable to remove the invitation',
  },
  deleteSessionError: {
    id: `${scope}.deleteSessionError`,
    defaultMessage: 'Unable to remove the session',
  },
  deleteSessionSuccess: {
    id: `${scope}.deleteSessionSuccess`,
    defaultMessage: 'Successfully deleted session',
  },
  copySuccess: {
    id: `${scope}.copySuccess`,
    defaultMessage:
      'CIAS is copying your session. We will send you an e-mail when this process has been finished.',
  },
  translateSuccess: {
    id: `${scope}.translateSuccess`,
    defaultMessage:
      'CIAS is translating your intervention. We will send you an e-mail when this process has been finished.',
  },
  translateError: {
    id: `${scope}.translateError`,
    defaultMessage: `Couldn't translate the intervention`,
  },
  addAttachmentSuccess: {
    id: `${scope}.addAttachmentSuccess`,
    defaultMessage: 'Files uploaded successfully!',
  },
  addAttachmentError: {
    id: `${scope}.addAttachmentError`,
    defaultMessage: 'An error has occured while uploading the files',
  },
  deleteAttachmentSuccess: {
    id: `${scope}.deleteAttachmentSuccess`,
    defaultMessage: 'File deleted successfully!',
  },
  deleteAttachmentError: {
    id: `${scope}.deleteAttachmentError`,
    defaultMessage: 'An error has occured while deleting your file',
  },
});
