import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChartStatus, ChartTypeDto } from 'global/reducers/dashboardSections';
import { HUNDRED_PERCENT } from 'utils/mathUtils';
import maxBy from 'lodash/maxBy';

import Chart, { ChartType } from 'components/Chart';
import Box from 'components/Box';
import Text from 'components/Text';

import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import {
  generateBarChartPreviewData,
  MAX_NUMERIC_VALUE,
} from '../generateBarChartData';
import {
  STACK_Y_AXIS_KEY,
  X_AXIS_KEY,
  Y_AXIS_KEY,
  POPULATION_KEY,
} from '../constants';
import { BarChartTooltip } from '../styled';
import messages from '../messages';

const BarChart = ({
  chartType,
  patterns,
  trendLine,
  realChartData,
  status,
  formatMessage,
  disableAnimation,
}) => {
  const data = useMemo(() => {
    if (!realChartData && status !== ChartStatus.DRAFT) return null;
    if (!realChartData) return generateBarChartPreviewData(chartType);
    if (realChartData) {
      return realChartData;
    }
  }, [chartType, realChartData, status]);

  const maxNumericValue = useMemo(() => {
    if (realChartData && chartType === ChartTypeDto.NUMERIC_BAR_CHART) {
      const maxPopulationData = maxBy(
        realChartData,
        ({ value, notMatchedValue }) => value + notMatchedValue,
      );
      if (!maxPopulationData) return undefined;

      return maxPopulationData.value + maxPopulationData.notMatchedValue;
    }
    return undefined;
  }, [realChartData, chartType]);

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
              <p>{`Not matched: ${barData[STACK_Y_AXIS_KEY]}`}</p>
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
    if (status !== ChartStatus.DRAFT) {
      return [0, maxNumericValue];
    }
    return [0, MAX_NUMERIC_VALUE];
  }, [chartType, status, maxNumericValue]);

  const xAxisProps = useMemo(
    () => ({
      dataKey: X_AXIS_KEY,
      interval: 0,
    }),
    [],
  );

  const yAxisProps = useMemo(
    () => ({ tickFormatter, domain, allowDecimals: false }),
    [chartType, domain],
  );

  const cartesianGridProps = useMemo(
    () => ({ vertical: false, strokeDasharray: '4' }),
    [],
  );

  const tooltip = useMemo(() => ({ content: tooltipFormatter }), []);

  const wrapWithBox = comp => (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justify="center"
      align="center"
    >
      {comp}
    </Box>
  );
  if (data === null) {
    return wrapWithBox(<Spinner color={themeColors.secondary} />);
  }

  if (data.length === 0) {
    return wrapWithBox(
      <Text fontWeight="bold" fontSize="16px">
        {formatMessage(messages.noChartsData)}
      </Text>,
    );
  }

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
      tooltip={tooltip}
      stackDataKey={
        chartType === ChartTypeDto.NUMERIC_BAR_CHART && STACK_Y_AXIS_KEY
      }
      isAnimationActive={!disableAnimation}
    />
  );
};

BarChart.propTypes = {
  chartType: PropTypes.string,
  patterns: PropTypes.arrayOf(PropTypes.object),
  trendLine: PropTypes.bool,
  realChartData: PropTypes.any,
  status: PropTypes.string,
  formatMessage: PropTypes.func,
  disableAnimation: PropTypes.bool,
};

export default memo(BarChart);
