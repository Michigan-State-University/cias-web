import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageCases';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'The text in the SMS is:',
  },
  textMessagePlaceholder: {
    id: `${scope}.textMessagePlaceholder`,
    defaultMessage: 'Enter text here',
  },
  attachmentLabel: {
    id: `${scope}.attachmentLabel`,
    defaultMessage: 'Attachment in the SMS is:',
  },
  attachment: {
    id: `${scope}.attachment`,
    defaultMessage: 'Attachment',
  },
  maxImageFileSize: {
    id: `${scope}.maxImageFileSize`,
    defaultMessage: 'Max size of files of type:',
  },
  is: {
    id: `${scope}.is`,
    defaultMessage: 'is {maxSize}.',
  },
  maxOtherFileSize: {
    id: `${scope}.maxOtherFileSize`,
    defaultMessage: 'For other file types max size is {maxSize}.',
  },
});
