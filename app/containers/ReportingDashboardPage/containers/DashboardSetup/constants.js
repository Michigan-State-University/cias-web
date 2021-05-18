import { createContext } from 'react';

import { ChartType, initialState } from 'global/reducers/dashboardSections';

import { themeColors } from 'theme';

import { DEFAULT_COLORS } from 'components/ReactColor';

export const DashboardSectionsContext = createContext(initialState);

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
