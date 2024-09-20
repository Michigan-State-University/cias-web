import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.session';

export default defineMessages({
  editSessionSuccess: {
    id: `${scope}.editSessionSuccess`,
    defaultMessage: 'Session updated correctly',
  },
  editSessionError: {
    id: `${scope}.editSessionError`,
    defaultMessage: `Couldn't update session`,
  },
  smsCodeError: {
    id: `${scope}.smsCodeError`,
    defaultMessage: `You have entered an incorrect code. Please try again.`,
  },
});
