import { defineMessages } from 'react-intl';

import { FileErrorCode } from './types';

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
  deleteFile: {
    id: `${scope}.deleteFile`,
    defaultMessage: 'Delete file',
  },
  fileTooLargeCustomValidation: {
    id: `${scope}.fileTooLargeCustomValidation`,
    defaultMessage: 'File cannot be larger than {maxSize}',
  },
  [FileErrorCode.FILE_INVALID_TYPE]: {
    id: `${scope}.file-invalid-type`,
    defaultMessage:
      'Unsupported file format. Supported file formats are: {formattedAcceptedFormats}',
  },
});
