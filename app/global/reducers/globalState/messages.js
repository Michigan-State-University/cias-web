/*
 * GlobalState Messages
 *
 * This contains all the text for the GlobalState sagas.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.GlobalState';

export default defineMessages({
  downloadFileError: {
    id: `${scope}.downloadFileError`,
    defaultMessage: 'Unable to download the file',
  },
  defaultFileName: {
    id: `${scope}.defaultFileName`,
    defaultMessage: 'downloaded_file',
  },
});
