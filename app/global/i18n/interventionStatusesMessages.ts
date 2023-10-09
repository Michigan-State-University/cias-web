import { defineMessages } from 'react-intl';

export const scope = 'app.global.InterventionStatusesMessages';

export default defineMessages({
  draft: {
    id: `${scope}.draft`,
    defaultMessage: 'Draft',
  },
  published: {
    id: `${scope}.published`,
    defaultMessage: 'Published',
  },
  closed: {
    id: `${scope}.closed`,
    defaultMessage: 'Closed',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
});
