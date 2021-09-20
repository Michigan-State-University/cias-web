/*
 * TextMessageSettings
 *
 * This contains all the text for the TextMessageSettings container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageSettings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'SMS Settings',
  },
  textMessageName: {
    id: `${scope}.textMessageName`,
    defaultMessage: 'Tex Message Tile Name',
  },
  addVariableButton: {
    id: `${scope}.addVariableButton`,
    defaultMessage: '+ Add variable',
  },
  deleteTextMessageHeader: {
    id: `${scope}.deleteTextMessageHeader`,
    defaultMessage: 'Delete Text Message',
  },
  deleteTextMessageMessage: {
    id: `${scope}.deleteTextMessageMessage`,
    defaultMessage:
      'Are you sure you want to delete this Text Message? It will not be possible to recover it later.',
  },
  deleteIcon: {
    id: `${scope}.deleteIcon`,
    defaultMessage: 'Delete Text Message',
  },
  cloneIcon: {
    id: `${scope}.cloneIcon`,
    defaultMessage: 'Duplicate Text Message',
  },
});
