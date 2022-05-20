/*
 * QuickExit Messages
 *
 * This contains all the text for the QuickExit component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.QuickExit';

export default defineMessages({
  exit: {
    id: `${scope}.exit`,
    defaultMessage: `Exit`,
  },
  exitButtonTitle: {
    id: `${scope}.exitButtonTitle`,
    defaultMessage: `Quickly close the intervention`,
  },
  exitIconAlt: {
    id: `${scope}.exitIconAlt`,
    defaultMessage: `Quick Exit button icon`,
  },
});
