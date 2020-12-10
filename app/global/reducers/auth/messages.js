import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.interventions';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy intervention',
  },
  sendSuccess: {
    id: `${scope}.sendSuccess`,
    defaultMessage: 'You have successfully sent a copy of the session!',
  },
  changePasswordSuccess: {
    id: `${scope}.changePasswordSuccess`,
    defaultMessage: 'You have successfully changed your password!',
  },
  changeEmailSuccess: {
    id: `${scope}.changeEmailSuccess`,
    defaultMessage: 'You have successfully changed your e-mail address!',
  },
  changePhoneNumberSuccess: {
    id: `${scope}.changePhoneNumberSuccess`,
    defaultMessage: 'You have successfully changed your phone number!',
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
