import { defineMessages } from 'react-intl';

export const scope = 'app.components.FileInput';

export default defineMessages({
  dragAndDropInstructions: {
    id: `${scope}.dragAndDropInstructions`,
    defaultMessage: `Drag & drop file here to start uploading`,
  },
  dragAndDropError: {
    id: `${scope}.dragAndDropError`,
    defaultMessage: `Couldn't upload a file`,
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: `OR`,
  },
  browseFiles: {
    id: `${scope}.browseFiles`,
    defaultMessage: `Browse files`,
  },
  fileExtensionIcon: {
    id: `${scope}.fileExtensionIcon`,
    defaultMessage: `File extension icon`,
  },
  removeFile: {
    id: `${scope}.removeFile`,
    defaultMessage: `Remove file`,
  },
});
