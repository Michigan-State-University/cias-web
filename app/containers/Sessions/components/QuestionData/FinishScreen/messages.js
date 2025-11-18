import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FinishScreen';

export default defineMessages({
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'My Dashboard',
  },
  tooltip: {
    id: `${scope}.tooltip`,
    defaultMessage: 'Visible only for logged in participants',
  },
  completeSession: {
    id: `${scope}.completeSession`,
    defaultMessage: 'Complete Session',
  },
});
