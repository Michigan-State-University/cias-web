/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

import { ShareExternallyLevel } from './types';

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
  [ShareExternallyLevel.INTERVENTION]: {
    id: `${scope}.${ShareExternallyLevel.INTERVENTION}`,
    defaultMessage:
      "Use this feature to send a copy of your intervention to another researcher.<br/>Note: They will become the owner of the copy and you will not be able to see each other's changes.",
  },
  [ShareExternallyLevel.QUESTION_GROUP]: {
    id: `${scope}.${ShareExternallyLevel.QUESTION_GROUP}`,
    defaultMessage:
      "Use this feature to send a copy of your question group(s) to another researcher.<br/>Note: They will become the owner of the copy and you will not be able to see each other's changes.",
  },
});
