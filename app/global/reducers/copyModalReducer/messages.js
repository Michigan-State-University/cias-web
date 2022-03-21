import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.copyModalReducer';

export default defineMessages({
  fetchInterventionsError: {
    id: `${scope}.fetchInterventionsError`,
    defaultMessage: 'Cannot fetch interventions',
  },
});
