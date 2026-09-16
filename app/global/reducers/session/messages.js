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
  sessionVariableUpdateQueued: {
    id: `${scope}.sessionVariableUpdateQueued`,
    defaultMessage:
      'Variable references are being updated. Please refresh the page in a moment to see the results.',
  },
  sessionVariableUpdateInProgress: {
    id: `${scope}.sessionVariableUpdateInProgress`,
    defaultMessage:
      'Cannot update session variable while references update is in progress. Please try again in a few moments.',
  },
});
