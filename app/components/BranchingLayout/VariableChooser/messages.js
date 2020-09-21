/*
 * VariableChooser Messages
 *
 * This contains all the text for the VariableChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VariableChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Next Screen',
  },
  noVariables: {
    id: `${scope}.noVariables`,
    defaultMessage: 'No variables defined yet',
  },
});
