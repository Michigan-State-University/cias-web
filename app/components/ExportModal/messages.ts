import { defineMessages } from 'react-intl';

export const scope = 'app.components.ExportModal';

export default defineMessages({
  fileBoxLabel: {
    id: `${scope}.fileBoxLabel`,
    defaultMessage: 'Your generated file:',
  },
  fileGeneratedAt: {
    id: `${scope}.fileGeneratedAt`,
    defaultMessage: 'File generated at {date}',
  },
  updateFileButtonLabel: {
    id: `${scope}.updateFileButtonLabel`,
    defaultMessage: 'Generate new file',
  },
  downloadFileButtonLabel: {
    id: `${scope}.downloadFileButtonLabel`,
    defaultMessage: 'Download file',
  },
  exportConfirmationDescription: {
    id: `${scope}.exportConfirmationDescription`,
    defaultMessage:
      'Your file is currently being generated.<br />We will notify you by e-mail when it’s ready.',
  },
  exportConfirmationButtonTitle: {
    id: `${scope}.exportConfirmationButtonTitle`,
    defaultMessage: 'Understood',
  },
  spinnerIconAlt: {
    id: `${scope}.spinnerIconAlt`,
    defaultMessage: 'Spinner',
  },
});
