import { defineMessages } from 'react-intl';

import { ShareExternallyLevel } from './types';

export const scope =
  'app.containers.ShareExternallyModal.ShareExternallyLevels';

export default defineMessages<ShareExternallyLevel>({
  intervention_level: {
    id: `${scope}.intervention_level`,
    defaultMessage:
      "Use this feature to send a copy of your intervention to another researcher.<br/>Note: They will become the owner of the copy and you will not be able to see each other's changes.",
  },
  question_group_level: {
    id: `${scope}.question_group_level`,
    defaultMessage:
      "Use this feature to send a copy of your question group(s) to another researcher.<br/>Note: They will become the owner of the copy and you will not be able to see each other's changes.",
  },
});
