import { defineMessages } from 'react-intl';

import { CoverLetterLogoType } from 'models/ReportTemplate';

export const scope = 'app.containers.ReportTemplatesPage.CoverLetterLogoTypes';

export default defineMessages<CoverLetterLogoType>({
  report_logo: {
    id: `${scope}.report_logo`,
    defaultMessage: 'Use Report logo',
  },
  custom: {
    id: `${scope}.custom`,
    defaultMessage: 'Use custom logo',
  },
  no_logo: {
    id: `${scope}.no_logo`,
    defaultMessage: 'Don’t show logo',
  },
});
