/**
 * BarChart
 * Documentation: https://recharts.org/en-US/api/BarChart
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

import { generateBarChartTrendData } from './utils';
import { StyledResponsiveContainer } from './styled';
import { TREND_LINE_DATA_KEY } from './constants';

const BarChartComponent = ({
  cartesianGrid,
  children,
  data,
  dataKey,
  fill,
  trendLine,
  xAxis,
  yAxis,
  ...chartProps
}) => {
  const mergedData = useMemo(() => {
    if (trendLine) {
      const trendData = generateBarChartTrendData(data, dataKey);

      return data.map((dataItem, index) => ({
        ...dataItem,
        ...trendData[index],
      }));
    }

    return data;
  }, [data, dataKey, trendLine]);

  // Why that way? ResponsiveContainer needs `ref` ->
  // in function it won't work and extracting it to other component
  // with `forwardRef` is more clumsy in my opinion in that situation
  const ChartComponent = useMemo(() => (trendLine ? ComposedChart : BarChart), [
    trendLine,
  ]);

  const trendLineColor = useMemo(
    () =>
      trendLine &&
      Color(fill)
        .saturate(0.75)
        .lighten(0.15)
        .hex(),
    [fill, trendLine],
  );

  return (
    <StyledResponsiveContainer width="100%" height="100%">
      <ChartComponent data={mergedData}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        <Bar dataKey={dataKey} fill={fill} {...chartProps}>
          {children}
        </Bar>
        {trendLine && (
          <Line
            animationDuration={250}
            dataKey={TREND_LINE_DATA_KEY}
            dot={{ fill: trendLineColor }}
            stroke={trendLineColor}
            type="monotone"
          />
        )}
      </ChartComponent>
    </StyledResponsiveContainer>
  );
};

BarChartComponent.propTypes = {
  cartesianGrid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.arrayOf(PropTypes.node),
  data: PropTypes.arrayOf(PropTypes.object),
  dataKey: PropTypes.string,
  fill: PropTypes.string,
  trendLine: PropTypes.bool,
  xAxis: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  yAxis: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default memo(BarChartComponent);
