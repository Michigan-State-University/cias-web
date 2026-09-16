import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AnswerImageUploadModal';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Upload Answer Image',
  },
  instruction: {
    id: `${scope}.instruction`,
    defaultMessage: 'Drag & drop image file here to start uploading',
  },
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Upload',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Select an image to display alongside this answer option.',
  },
});
