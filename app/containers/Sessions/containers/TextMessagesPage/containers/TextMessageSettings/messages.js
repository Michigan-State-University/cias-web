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
  SMSAlertContent: {
    id: `${scope}.SMSAlertContent`,
    defaultMessage: 'SMS Alert Content',
  },
  addVariableButton: {
    id: `${scope}.addVariableButton`,
    defaultMessage: '+ Add variable',
  },
  addLinkButton: {
    id: `${scope}.addLinkButton`,
    defaultMessage: '+ Add link',
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
