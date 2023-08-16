import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Single';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Answer {index}',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new answer',
  },
  reorderIconAlt: {
    id: `${scope}.reorderIconAlt`,
    defaultMessage: 'Reorder icon {index}',
  },
  disabledHfhsValuesTooltip: {
    id: `${scope}.disabledHfhsValuesTooltip`,
    defaultMessage:
      'The session <bold>doesn’t have an HF Initial Screen</bold>, so Henry Ford Variables are not sent to HF.',
  },
});
