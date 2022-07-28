import { defineMessages } from 'react-intl';

export const scope = 'app.components.FileUpload';

export default defineMessages({
  error: {
    id: `${scope}.error`,
    defaultMessage: 'The file could not be uploaded',
  },
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Upload',
  },
  dragAndDrop: {
    id: `${scope}.dragAndDrop`,
    defaultMessage: 'or drag and drop file here',
  },
});
