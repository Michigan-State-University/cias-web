import { defineMessages } from 'react-intl';

import { CoverLetterLogoType } from 'models/ReportTemplate';

export const scope = 'app.containers.ReportTemplatesPage.CoverLetterLogoTypes';

export default defineMessages<CoverLetterLogoType>({
  [CoverLetterLogoType.REPORT_LOGO]: {
    id: `${scope}.report_logo`,
    defaultMessage: 'Use Report logo',
  },
  [CoverLetterLogoType.CUSTOM]: {
    id: `${scope}.custom`,
    defaultMessage: 'Use custom logo',
  },
  [CoverLetterLogoType.NO_LOGO]: {
    id: `${scope}.no_logo`,
    defaultMessage: 'Don’t show logo',
  },
});
