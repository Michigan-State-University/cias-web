import range from 'lodash/range';

import { ChartIntervalType } from 'models/Chart';

import { jsMonthToStringFormatter } from 'utils/formatters';
import { ChartTypeDto } from 'global/reducers/dashboardSections';
import { X_AXIS_KEY, STACK_Y_AXIS_KEY, POPULATION_KEY } from './constants';

const NUMBER_OF_MONTHS = 12;
const LAST_MONTH_INDEX = 11;
const NUMERIC_VALUES = [110, 50, 215, 400, 300, 150];
const PERCENTAGE_VALUES = [90, 25, 15, 65, 35, 50];
const NOT_MATCHED_VALUES = [130, 500, 90, 120, 300, 20];
export const MAX_NUMERIC_VALUE = 400;

const NUMBER_OF_QUARTERS = 4;
const LAST_QUARTER_INDEX = 3;

export const generateLastXMonths = (monthsToGenerate = 6) => {
  const currentMonth = new Date().getMonth();
  const monthOffset = LAST_MONTH_INDEX - currentMonth;

  const lastXMonths = range(monthsToGenerate).map(
    (item) => LAST_MONTH_INDEX - ((item + monthOffset) % NUMBER_OF_MONTHS),
  );

  return lastXMonths.reverse();
};

export const generateLastXQuarters = (quartersToGenerate = 4) => {
  const currentQuarter = Math.floor(new Date().getMonth() / 3);
  const currentYear = new Date().getFullYear();
  const quarterOffset = LAST_QUARTER_INDEX - currentQuarter;

  const lastXQuarters = range(quartersToGenerate).map((item) => ({
    quarter: LAST_QUARTER_INDEX - ((item + quarterOffset) % NUMBER_OF_QUARTERS),
    year: currentYear - Math.floor((item + quarterOffset) / NUMBER_OF_QUARTERS),
  }));

  return lastXQuarters.reverse();
};

const getBarValue = (chartType, index) =>
  chartType === ChartTypeDto.PERCENTAGE_BAR_CHART
    ? PERCENTAGE_VALUES[index]
    : NUMERIC_VALUES[index];

const generateBarChartMonthlyPreviewData = (chartType) => {
  const lastSixMonths = generateLastXMonths(6);

  const jsMonthFormatter = jsMonthToStringFormatter();

  return lastSixMonths.map((month, index) => {
    const monthName = jsMonthFormatter.format(new Date(2021, month, 1));
    const value = getBarValue(chartType, index);
    const extraData = {
      ...(chartType !== ChartTypeDto.NUMERIC_BAR_CHART && {
        [POPULATION_KEY]: NUMERIC_VALUES[index],
      }),
      ...(chartType !== ChartTypeDto.PERCENTAGE_BAR_CHART && {
        [STACK_Y_AXIS_KEY]: NOT_MATCHED_VALUES[index],
      }),
    };

    return {
      [X_AXIS_KEY]: monthName,
      value,
      ...extraData,
    };
  });
};

const generateBarChartQuarterlyPreviewData = (chartType) => {
  const lastFourQuarters = generateLastXQuarters(4);

  return lastFourQuarters.map(({ quarter, year }, index) => {
    const quarterName = `Q${quarter + 1} ${year}`;
    const value = getBarValue(chartType, index);
    const extraData = {
      ...(chartType !== ChartTypeDto.NUMERIC_BAR_CHART && {
        [POPULATION_KEY]: NUMERIC_VALUES[index],
      }),
      ...(chartType !== ChartTypeDto.PERCENTAGE_BAR_CHART && {
        [STACK_Y_AXIS_KEY]: NOT_MATCHED_VALUES[index],
      }),
    };

    return {
      [X_AXIS_KEY]: quarterName,
      value,
      ...extraData,
    };
  });
};

export const generateBarChartPreviewData = (chartType, intervalType) => {
  switch (intervalType) {
    case ChartIntervalType.MONTHLY: {
      return generateBarChartMonthlyPreviewData(chartType);
    }
    case ChartIntervalType.QUARTERLY: {
      return generateBarChartQuarterlyPreviewData(chartType);
    }
    default: {
      return [];
    }
  }
};
