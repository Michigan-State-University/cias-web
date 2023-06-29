/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ShareExternallyModal';

export default defineMessages({
  shareExternally: {
    id: `${scope}.shareExternally`,
    defaultMessage: 'Share externally',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
  },
});
