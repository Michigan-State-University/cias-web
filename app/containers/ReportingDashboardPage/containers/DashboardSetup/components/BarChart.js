import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChartStatus, ChartTypeDto } from 'global/reducers/dashboardSections';
import { HUNDRED_PERCENT } from 'utils/mathUtils';
import maxBy from 'lodash/maxBy';

import Chart, { ChartType } from 'components/Chart';
import Box from 'components/Box';
import Text from 'components/Text';

import Spinner from 'components/Spinner';
import { colors, themeColors } from 'theme';
import {
  generateBarChartPreviewData,
  MAX_NUMERIC_VALUE,
} from '../generateBarChartData';
import {
  STACK_Y_AXIS_KEY,
  INVALID_Y_AXIS_KEY,
  X_AXIS_KEY,
  Y_AXIS_KEY,
  POPULATION_KEY,
} from '../constants';
import { BarChartTooltip } from '../styled';
import messages from '../messages';

// Two decimal places, matching the backend's `.round(2)` on the matched percentage. The rounding
// factor is DERIVED from the place count so the name, the comment and the value cannot drift apart.
const SHARE_DECIMAL_PLACES = 2;
const SHARE_ROUNDING_FACTOR = 10 ** SHARE_DECIMAL_PLACES;

// `total` is 0 on any gap period (`bar_chart.rb` walks every month between the first and last
// `filled_at`, so a month with no participants publishes an all-zero datum). Without the guard
// every such tooltip would read `(NaN%)`.
const shareOf = (part, total) =>
  total
    ? Math.round((part / total) * HUNDRED_PERCENT * SHARE_ROUNDING_FACTOR) /
      SHARE_ROUNDING_FACTOR
    : 0;

const stackTotal = ({ value, notMatchedValue, invalidValue }) =>
  (value ?? 0) + (notMatchedValue ?? 0) + (invalidValue ?? 0);

const BarChart = ({
  chartType,
  intervalType,
  patterns,
  trendLine,
  realChartData,
  status,
  formatMessage,
  disableAnimation,
}) => {
  const data = useMemo(() => {
    if (!realChartData && status !== ChartStatus.DRAFT) return null;
    if (!realChartData)
      return generateBarChartPreviewData(chartType, intervalType);
    if (realChartData) {
      return realChartData;
    }
  }, [chartType, realChartData, status, intervalType]);

  const maxNumericValue = useMemo(() => {
    if (realChartData && chartType === ChartTypeDto.NUMERIC_BAR_CHART) {
      // Declares the ceiling we mean: the whole stack, matched + not matched + invalid.
      // NOT a clip fix - recharts never clips to an explicit domain unless `allowDataOverflow`
      // is set, and nothing in this repo sets it, so an explicit bound can only RAISE the axis
      // and a non-numeric one is discarded in favour of the data domain. For published charts
      // this is a no-op that buys an explicit, correct ceiling instead of an undocumented
      // recharts fallback; the visible effect is ~14px of headroom on quarterly previews.
      const maxPopulationData = maxBy(realChartData, stackTotal);
      if (!maxPopulationData) return undefined;

      return stackTotal(maxPopulationData);
    }
    return undefined;
  }, [realChartData, chartType]);

  const tickFormatter = (value) => {
    switch (chartType) {
      case ChartTypeDto.PERCENTAGE_BAR_CHART:
        return `${value}%`;
      case ChartTypeDto.NUMERIC_BAR_CHART:
      default:
        return value;
    }
  };

  const tooltipFormatter = (tooltipData) => {
    const { active, payload, label } = tooltipData;
    switch (chartType) {
      case ChartTypeDto.PERCENTAGE_BAR_CHART: {
        if (active && payload && payload.length) {
          const { payload: barData } = payload[0];
          const population = barData[POPULATION_KEY];
          const invalidValue = barData[INVALID_Y_AXIS_KEY] ?? 0;
          return (
            <BarChartTooltip>
              <p>{`${label} : ${barData[Y_AXIS_KEY]}%`}</p>
              <p>
                {formatMessage(messages.barChartTooltipPopulation, {
                  value: population,
                })}
              </p>
              {/* The only place Invalid surfaces on this chart type - it counts toward the
                  denominator but gets no series of its own. */}
              <p>
                {formatMessage(messages.barChartTooltipInvalidWithShare, {
                  value: invalidValue,
                  share: shareOf(invalidValue, population),
                })}
              </p>
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
              <p>
                {formatMessage(messages.barChartTooltipMatched, {
                  value: barData[Y_AXIS_KEY],
                })}
              </p>
              <p>
                {formatMessage(messages.barChartTooltipNotMatched, {
                  value: barData[STACK_Y_AXIS_KEY],
                })}
              </p>
              <p>
                {formatMessage(messages.barChartTooltipInvalid, {
                  value: barData[INVALID_Y_AXIS_KEY] ?? 0,
                })}
              </p>
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

  // `tooltipFormatter` closes over `chartType` and `formatMessage` - without them in the deps
  // the tooltip keeps rendering the values captured on the first render.
  const tooltip = useMemo(
    () => ({ content: tooltipFormatter }),
    [chartType, formatMessage],
  );

  const wrapWithBox = (comp) => (
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
      secondStackDataKey={
        chartType === ChartTypeDto.NUMERIC_BAR_CHART && INVALID_Y_AXIS_KEY
      }
      secondStackFill={colors.heather}
      isAnimationActive={!disableAnimation}
    />
  );
};

BarChart.propTypes = {
  chartType: PropTypes.string,
  intervalType: PropTypes.string,
  patterns: PropTypes.arrayOf(PropTypes.object),
  trendLine: PropTypes.bool,
  realChartData: PropTypes.any,
  status: PropTypes.string,
  formatMessage: PropTypes.func,
  disableAnimation: PropTypes.bool,
};

export default memo(BarChart);
