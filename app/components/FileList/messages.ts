import { defineMessages } from 'react-intl';

export const scope = 'app.components.FileList';

export default defineMessages({
  listHeader: {
    id: `${scope}.listHeader`,
    defaultMessage: 'Materials to download',
  },
  noFiles: {
    id: `${scope}.noFiles`,
    defaultMessage: 'There are no uploaded files yet',
  },
});
