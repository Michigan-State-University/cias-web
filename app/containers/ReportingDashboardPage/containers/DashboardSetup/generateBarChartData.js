import range from 'lodash/range';

import { jsMonthToStringFormatter } from 'utils/formatters/dateFormatters';
import { ChartTypeDto } from 'global/reducers/dashboardSections';

const NUMBER_OF_MONTHS = 12;
const LAST_MONTH_INDEX = 11;
const NUMERIC_VALUES = [110, 50, 215, 400, 300, 150];
const PERCENTAGE_VALUES = [90, 25, 15, 65, 35, 50];
export const MAX_NUMERIC_VALUE = 400;

export const generateLastXMonths = (monthsToGenerate = 6) => {
  const currentMonth = new Date().getMonth();
  const monthOffset = LAST_MONTH_INDEX - currentMonth;

  const lastXMonths = range(monthsToGenerate).map(
    item => LAST_MONTH_INDEX - ((item + monthOffset) % NUMBER_OF_MONTHS),
  );

  return lastXMonths.reverse();
};

const getBarValue = (chartType, index) =>
  chartType === ChartTypeDto.PERCENTAGE_BAR_CHART
    ? PERCENTAGE_VALUES[index]
    : NUMERIC_VALUES[index];

export const generateBarChartPreviewData = chartType => {
  const lastSixMonths = generateLastXMonths(6);

  const jsMonthFormatter = jsMonthToStringFormatter();

  return lastSixMonths.map((month, index) => {
    const monthName = jsMonthFormatter.format(new Date(2021, month, 1));
    const value = getBarValue(chartType, index);

    return {
      name: monthName,
      value,
    };
  });
};
