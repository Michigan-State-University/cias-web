import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.textMessages';

export default defineMessages({
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy the sms plan!',
  },
  fetchTextMessagesError: {
    id: `${scope}.fetchTextMessagesError`,
    defaultMessage: "Couldn't fetch text messages",
  },
  fetchVariantsAndPhonesError: {
    id: `${scope}.fetchVariantsAndPhonesError`,
    defaultMessage:
      "Couldn't fetch text message formula cases and alert recipients",
  },
  addPhoneError: {
    id: `${scope}.addPhoneError`,
    defaultMessage: "Couldn't add a recipient",
  },
  removePhoneError: {
    id: `${scope}.removePhoneError`,
    defaultMessage: "Couldn't remove the recipient",
  },
  updatePhoneError: {
    id: `${scope}.updatePhoneError`,
    defaultMessage: "Couldn't update the recipient's phone",
  },
});
