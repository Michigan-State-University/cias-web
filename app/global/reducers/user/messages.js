import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.user';

export default defineMessages({
  deleteAvatarError: {
    id: `${scope}.deleteAvatarError`,
    defaultMessage: 'Cannot remove user avatar.',
  },
  addAvatarError: {
    id: `${scope}.addAvatarError`,
    defaultMessage: 'Cannot change user avatar.',
  },
  changeStatusSuccess: {
    id: `${scope}.changeStatusSuccess`,
    defaultMessage: 'User status has changed',
  },
  changeStatusFailure: {
    id: `${scope}.changeStatusFailure`,
    defaultMessage: 'Cannot change user status',
  },
  resendInvitationLinkSuccess: {
    id: `${scope}.resendInvitationLinkSuccess`,
    defaultMessage: 'Invitation link has been sent',
  },
  resendInvitationLinkError: {
    id: `${scope}.resendInvitationLinkError`,
    defaultMessage: 'Cannot send an invitation link',
  },
});
