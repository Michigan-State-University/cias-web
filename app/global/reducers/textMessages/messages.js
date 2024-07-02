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
  reorderVariantsError: {
    id: `${scope}.reorderVariantsError`,
    defaultMessage: "Couldn't reorder text message variants",
  },
  uploadTextMessageAttachmentError: {
    id: `${scope}.uploadTextMessageAttachmentError`,
    defaultMessage: "Couldn't upload SMS message attachment",
  },
  deleteTextMessageAttachmentError: {
    id: `${scope}.deleteTextMessageAttachmentError`,
    defaultMessage: "Couldn't delete SMS message attachment",
  },
  createSmsLinkSuccess: {
    id: `${scope}.createSmsLinkSuccess`,
    defaultMessage: 'SMS link added',
  },
  createSmsLinkError: {
    id: `${scope}.createSmsLinkError`,
    defaultMessage: `Couldn't create SMS link`,
  },
});
