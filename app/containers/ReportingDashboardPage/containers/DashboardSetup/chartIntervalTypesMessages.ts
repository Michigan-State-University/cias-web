import { defineMessages } from 'react-intl';

import { ChartIntervalType } from 'models/Chart';

export const scope = 'app.global.DashboardSetup.ChartIntervalTypes';

export default defineMessages<ChartIntervalType>({
  [ChartIntervalType.MONTHLY]: {
    id: `${scope}.monthly`,
    defaultMessage: 'Monthly',
  },
  [ChartIntervalType.QUARTERLY]: {
    id: `${scope}.quarterly`,
    defaultMessage: 'Quarterly',
  },
});
