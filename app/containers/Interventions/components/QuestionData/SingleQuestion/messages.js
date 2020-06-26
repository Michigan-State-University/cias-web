import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Single';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Type answer here...',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new answer',
  },
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
});
