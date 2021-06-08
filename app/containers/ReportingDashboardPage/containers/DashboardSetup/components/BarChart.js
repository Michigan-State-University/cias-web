import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChartTypeDto } from 'global/reducers/dashboardSections';
import { HUNDRED_PERCENT } from 'utils/mathUtils';

import Chart, { ChartType } from 'components/Chart';

import {
  generateBarChartPreviewData,
  MAX_NUMERIC_VALUE,
} from '../generateBarChartData';
import { X_AXIS_KEY, Y_AXIS_KEY } from '../constants';

const BarChart = ({ chartType, defaultPattern, patterns, trendLine }) => {
  const data = useMemo(() => generateBarChartPreviewData(chartType), [
    patterns,
    defaultPattern,
    chartType,
  ]);

  const tickFormatter = value => {
    switch (chartType) {
      case ChartTypeDto.PERCENTAGE_BAR_CHART:
        return `${value}%`;
      case ChartTypeDto.NUMERIC_BAR_CHART:
      default:
        return value;
    }
  };

  // hardcoded domain value for preview
  const domain =
    chartType === ChartTypeDto.PERCENTAGE_BAR_CHART
      ? [0, HUNDRED_PERCENT]
      : [0, MAX_NUMERIC_VALUE];

  const xAxisProps = useMemo(() => ({ dataKey: X_AXIS_KEY, interval: 0 }), []);

  const yAxisProps = useMemo(() => ({ tickFormatter, domain }), [chartType]);

  const cartesianGridProps = useMemo(
    () => ({ vertical: false, strokeDasharray: '4' }),
    [],
  );

  return (
    <Chart
      cartesianGrid={cartesianGridProps}
      data={data}
      dataKey={Y_AXIS_KEY}
      fill={patterns[0].color}
      trendLine={trendLine}
      type={ChartType.BAR}
      xAxis={xAxisProps}
      yAxis={yAxisProps}
    />
  );
};

BarChart.propTypes = {
  chartType: PropTypes.string,
  defaultPattern: PropTypes.object,
  patterns: PropTypes.arrayOf(PropTypes.object),
  trendLine: PropTypes.bool,
};

export default memo(BarChart);
