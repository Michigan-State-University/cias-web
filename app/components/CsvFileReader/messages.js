import { defineMessages } from 'react-intl';

export const scope = 'app.components.CsvFileReader';

export default defineMessages({
  error: {
    id: `${scope}.error`,
    defaultMessage:
      'An error has occured during uploading a file {file}: {err}',
  },
});
