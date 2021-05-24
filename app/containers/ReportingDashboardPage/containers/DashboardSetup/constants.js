import { createContext } from 'react';

import {
  ChartType,
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

export const generateNewPatternForChartType = (chartType, newIndex) => {
  const pattern = {
    color: DEFAULT_COLORS[newIndex] ?? themeColors.secondary,
    match: '=',
  };

  switch (chartType) {
    case ChartType.PIE_CHART:
      return { ...pattern, label: '' };
    case ChartType.NUMERIC_BAR_CHART:
    case ChartType.PERCENTAGE_BAR_CHART:
      return pattern;
    default:
      return null;
  }
};
