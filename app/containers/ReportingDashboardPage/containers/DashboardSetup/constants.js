import { createContext } from 'react';

import {
  ChartTypeDto,
  initialState,
  StatusPermissions,
} from 'global/reducers/dashboardSections';

import { elements, fontSizes, themeColors } from 'theme';

import { DEFAULT_COLORS } from 'components/ReactColor';

export const DashboardSectionsContext = createContext(initialState);

export const ChartSettingsContext = createContext({
  statusPermissions: StatusPermissions(''),
});

// A minimum higher than the number of variables the formula references can never be met, so
// every participant would be classified Invalid / Insufficient Data. It happens when the payload
// is edited down and the stored minimum is left behind - never rewritten silently, because the
// minimum is the researcher's clinical threshold to choose.
export const isMinAnsweredStale = (formula, formulaVariableCount) =>
  (formula?.minAnsweredVariables ?? 0) > (formulaVariableCount ?? 0);

export const CHART_NAME_MAX_WIDTH = elements.chartTileWidth / 2 - 50;
export const CHART_WIDTH = elements.chartTileWidth - 50;
export const CHART_HEIGHT = elements.chartTileHeight - 150;

export const X_AXIS_KEY = 'label';
export const STACK_Y_AXIS_KEY = 'notMatchedValue';
export const INVALID_Y_AXIS_KEY = 'invalidValue';
export const Y_AXIS_KEY = 'value';
export const POPULATION_KEY = 'population';

export const MAX_LABEL_WIDTH = 100;
export const HALF_LABEL_HEIGHT = +fontSizes.regular.replace('px', '') / 2;

export const generateNewPatternForChartType = (chartType, newIndex) => {
  const pattern = {
    color: DEFAULT_COLORS[newIndex] ?? themeColors.secondary,
    match: '=',
  };

  switch (chartType) {
    case ChartTypeDto.PIE_CHART:
      return { ...pattern, label: '' };
    case ChartTypeDto.NUMERIC_BAR_CHART:
    case ChartTypeDto.PERCENTAGE_BAR_CHART:
      return pattern;
    default:
      return null;
  }
};
