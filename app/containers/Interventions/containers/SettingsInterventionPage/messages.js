import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsInterventionPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Settings',
  },
  sessionSettings: {
    id: `${scope}.sessionSettings`,
    defaultMessage: 'Session Settings',
  },
  respondentSettings: {
    id: `${scope}.respondentSettings`,
    defaultMessage: 'Respondent Settings',
  },
});
