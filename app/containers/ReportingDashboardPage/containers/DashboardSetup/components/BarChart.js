import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChartStatus, ChartTypeDto } from 'global/reducers/dashboardSections';
import { HUNDRED_PERCENT } from 'utils/mathUtils';

import Chart, { ChartType } from 'components/Chart';

import {
  generateBarChartPreviewData,
  MAX_NUMERIC_VALUE,
} from '../generateBarChartData';
import {
  OTHER_Y_AXIS_KEY,
  X_AXIS_KEY,
  Y_AXIS_KEY,
  POPULATION_KEY,
} from '../constants';
import { BarChartTooltip } from '../styled';

const BarChart = ({
  chartType,
  defaultPattern,
  patterns,
  trendLine,
  singleChartData,
  status,
}) => {
  const data = useMemo(() => {
    if (!singleChartData) return generateBarChartPreviewData(chartType);
    if (singleChartData) {
      return singleChartData;
    }
  }, [patterns, defaultPattern, chartType, singleChartData]);

  const tickFormatter = value => {
    switch (chartType) {
      case ChartTypeDto.PERCENTAGE_BAR_CHART:
        return `${value}%`;
      case ChartTypeDto.NUMERIC_BAR_CHART:
      default:
        return value;
    }
  };

  const tooltipFormatter = tooltipData => {
    const { active, payload, label } = tooltipData;
    switch (chartType) {
      case ChartTypeDto.PERCENTAGE_BAR_CHART: {
        if (active && payload && payload.length) {
          const { payload: barData } = payload[0];
          return (
            <BarChartTooltip>
              <p>{`${label} : ${barData[Y_AXIS_KEY]}%`}</p>
              <p>{`Population: ${barData[POPULATION_KEY]}`}</p>
            </BarChartTooltip>
          );
        }
        return null;
      }
      case ChartTypeDto.NUMERIC_BAR_CHART: {
        if (active && payload && payload.length) {
          const { payload: barData } = payload[0];
          return (
            <BarChartTooltip>
              <p>{`${label}`}</p>
              <p>{`Matched: ${barData[Y_AXIS_KEY]}`}</p>
              <p>{`Not matched: ${barData[OTHER_Y_AXIS_KEY]}`}</p>
            </BarChartTooltip>
          );
        }
        return null;
      }
      default:
        return null;
    }
  };

  const domain = useMemo(() => {
    if (chartType === ChartTypeDto.PERCENTAGE_BAR_CHART) {
      return [0, HUNDRED_PERCENT];
    }
    if (status === ChartStatus.PUBLISHED) {
      return undefined;
    }
    return [0, MAX_NUMERIC_VALUE];
  }, [chartType, status]);

  const xAxisProps = useMemo(() => ({ dataKey: X_AXIS_KEY, interval: 0 }), []);

  const yAxisProps = useMemo(
    () => ({ tickFormatter, domain, allowDecimals: false }),
    [chartType],
  );

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
      tooltipFormatter={tooltipFormatter}
      otherDataKey={
        chartType === ChartTypeDto.NUMERIC_BAR_CHART && OTHER_Y_AXIS_KEY
      }
    />
  );
};

BarChart.propTypes = {
  chartType: PropTypes.string,
  defaultPattern: PropTypes.object,
  patterns: PropTypes.arrayOf(PropTypes.object),
  trendLine: PropTypes.bool,
  singleChartData: PropTypes.any,
  status: PropTypes.string,
};

export default memo(BarChart);
