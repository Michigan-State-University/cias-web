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
  Tooltip,
  Brush,
} from 'recharts';

import { generateBarChartTrendData } from './utils';
import { StyledResponsiveContainer } from './styled';
import { BRUSH_CONTAINER_HEIGHT, TREND_LINE_DATA_KEY } from './constants';

const BarChartComponent = ({
  cartesianGrid,
  children,
  data,
  dataKey,
  fill,
  trendLine,
  xAxis,
  yAxis,
  tooltip,
  stackDataKey,
  secondStackDataKey,
  secondStackFill,
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
  const ChartComponent = useMemo(
    () => (trendLine ? ComposedChart : BarChart),
    [trendLine],
  );

  const trendLineColor = useMemo(
    () => trendLine && Color(fill).saturate(0.75).lighten(0.15).hex(),
    [fill, trendLine],
  );

  const stackDataKeyColor = useMemo(
    () => stackDataKey && Color(fill).lighten(0.5).hex(),
    [fill, stackDataKey],
  );

  return (
    <StyledResponsiveContainer width="100%" height="100%">
      <ChartComponent data={mergedData}>
        {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
        {xAxis && <XAxis {...xAxis} />}
        {yAxis && <YAxis {...yAxis} />}
        <Bar dataKey={dataKey} fill={fill} stackId="stack-1" {...chartProps}>
          {children}
        </Bar>
        {stackDataKey && (
          <Bar
            dataKey={stackDataKey}
            fill={stackDataKeyColor}
            stackId="stack-1"
            {...chartProps}
          >
            {children}
          </Bar>
        )}
        {/* Unlike `stackDataKey`, this segment takes an explicit colour instead of one derived
            from `fill` - it stands for a fixed, reserved category rather than a shade of the
            matched series. */}
        {secondStackDataKey && (
          <Bar
            dataKey={secondStackDataKey}
            fill={secondStackFill}
            stackId="stack-1"
            {...chartProps}
          >
            {children}
          </Bar>
        )}
        {data?.length > 3 && (
          <Brush
            startIndex={0}
            endIndex={2}
            dataKey={xAxis?.dataKey}
            height={BRUSH_CONTAINER_HEIGHT}
          />
        )}
        {trendLine && (
          <Line
            animationDuration={250}
            dataKey={TREND_LINE_DATA_KEY}
            dot={{ fill: trendLineColor }}
            stroke={trendLineColor}
            type="monotone"
          />
        )}
        {tooltip && <Tooltip cursor={false} {...tooltip} />}
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
  tooltip: PropTypes.object,
  stackDataKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  secondStackDataKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // Required only when a second stacked key is actually requested. recharts renders a `<Bar>`
  // with no `fill` as black, and the reserved Invalid grey must never be derived from another
  // series, so there is deliberately no fallback colour - a loud black segment beats a
  // plausible-looking wrong one.
  secondStackFill: (props, propName, componentName) => {
    if (props.secondStackDataKey && typeof props[propName] !== 'string') {
      return new Error(
        `\`${componentName}\` requires \`${propName}\` when \`secondStackDataKey\` is set; ` +
          'a <Bar> without an explicit fill renders black.',
      );
    }
    return null;
  },
};

export default memo(BarChartComponent);
