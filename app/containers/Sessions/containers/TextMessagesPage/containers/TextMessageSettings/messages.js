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
});