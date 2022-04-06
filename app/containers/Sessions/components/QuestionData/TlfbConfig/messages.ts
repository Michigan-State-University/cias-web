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
  numberOfDays: {
    id: `${scope}.numberOfDays`,
    defaultMessage: 'Number of days',
  },
  dateRange: {
    id: `${scope}.dateRange`,
    defaultMessage: 'Date range',
  },
  dateFrom: {
    id: `${scope}.dateFrom`,
    defaultMessage: 'Date from',
  },
  dateTo: {
    id: `${scope}.dateTo`,
    defaultMessage: 'Date to',
  },
  selectDate: {
    id: `${scope}.selectDate`,
    defaultMessage: 'Select date',
  },
  helpingMaterials: {
    id: `${scope}.helpingMaterials`,
    defaultMessage: 'Helping materials',
  },
  displayHelpingMaterials: {
    id: `${scope}.displayHelpingMaterials`,
    defaultMessage: 'Display helping materials to the participants',
  },
});
