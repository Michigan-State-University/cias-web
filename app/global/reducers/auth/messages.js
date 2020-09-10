import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.problems';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy problem',
  },
  sendSuccess: {
    id: `${scope}.sendSuccess`,
    defaultMessage: 'You have successfuly sent a copy of the intervention!',
  },
  changePasswordSuccess: {
    id: `${scope}.changePasswordSuccess`,
    defaultMessage: 'You have successfuly changed your password!',
  },
  changeEmailSuccess: {
    id: `${scope}.changeEmailSuccess`,
    defaultMessage: 'You have successfuly changed your e-mail address!',
  },
  deleteAvatarError: {
    id: `${scope}.deleteAvatarError`,
    defaultMessage: 'Cannot remove your avatar.',
  },
  addAvatarError: {
    id: `${scope}.addAvatarError`,
    defaultMessage: 'Cannot change your avatar.',
  },
});
