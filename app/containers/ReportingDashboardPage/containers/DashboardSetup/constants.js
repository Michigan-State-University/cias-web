import { createContext } from 'react';

import {
  ChartTypeDto,
  initialState,
  StatusPermissions,
} from 'global/reducers/dashboardSections';

import { elements, themeColors } from 'theme';

import { DEFAULT_COLORS } from 'components/ReactColor';

export const DashboardSectionsContext = createContext(initialState);

export const ChartSettingsContext = createContext({
  statusPermissions: StatusPermissions(''),
});

export const CHART_NAME_MAX_WIDTH = elements.chartTileWidth / 2 - 50;
export const CHART_WIDTH = elements.chartTileWidth - 50;
export const CHART_HEIGHT = elements.chartTileHeight - 100;

export const X_AXIS_KEY = 'label';
export const STACK_Y_AXIS_KEY = 'notMatchedValue';
export const Y_AXIS_KEY = 'value';
export const POPULATION_KEY = 'population';

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
