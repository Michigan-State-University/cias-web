import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TlfbConfig';

export default defineMessages({
  tlfbTimeframe: {
    id: `${scope}.tlfbTimeframe`,
    defaultMessage: 'TLFB Timeframe',
  },
  noOfDaysLabel: {
    id: `${scope}.noOfDaysLabel`,
    defaultMessage: 'Type the number of days',
  },
  noOfDaysPlaceholder: {
    id: `${scope}.noOfDaysPlaceholder`,
    defaultMessage: 'E.g. 20',
  },
});
