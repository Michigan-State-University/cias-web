import { defineMessages } from 'react-intl';

export const scope = 'app.components.ExportModal';

export default defineMessages({
  fileBoxLabel: {
    id: `${scope}.fileBoxLabel`,
    defaultMessage: 'Your last export file:',
  },
  fileGeneratedAt: {
    id: `${scope}.fileGeneratedAt`,
    defaultMessage: 'File generated at {date}',
  },
});
