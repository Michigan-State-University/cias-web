import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { ChartType } from 'global/reducers/dashboardSections';

import PieChartSettings from './PieChartSettings';
import { SettingsContainer } from '../../../styled';

const ChartSettings = ({ chart }) => {
  const wrapper = component => (
    <SettingsContainer>{component}</SettingsContainer>
  );

  switch (chart.chartType) {
    case ChartType.PIE_CHART:
      return wrapper(<PieChartSettings chart={chart} />);
    case ChartType.BAR_CHART:
    default:
      return null;
  }
};

ChartSettings.propTypes = {
  chart: PropTypes.object,
};

export default memo(ChartSettings);
