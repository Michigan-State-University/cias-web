import { defineMessages } from 'react-intl';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  variables: {
    variableNamePlaceholder: {
      id: `${scope}.variableNamePlaceholder`,
      defaultMessage: 'Variable name...',
    },
    variableScorePlaceholder: {
      id: `${scope}.variableScorePlaceholder`,
      defaultMessage: 'Score value...',
    },
    value: {
      id: `${scope}.value`,
      defaultMessage: 'Value:',
    },
  },
});
