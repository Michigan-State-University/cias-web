/**
 * Chart
 * Documentation: https://recharts.org/en-US
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'recharts';

import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';

import { ChartType } from './constants';

const Chart = ({ data, generateCellColor, type, ...chartProps }) => {
  const commonProps = useMemo(
    () => ({
      data,
      ...chartProps,
    }),
    [data, chartProps],
  );

  const renderCells = () =>
    data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={generateCellColor ? generateCellColor(entry, index) : ''}
      />
    ));

  switch (type) {
    case ChartType.PIE:
      return (
        <PieChartComponent {...commonProps}>{renderCells()}</PieChartComponent>
      );

    case ChartType.BAR:
      return <BarChartComponent {...commonProps} />;

    default:
      return null;
  }
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  generateCellColor: PropTypes.func,
  type: PropTypes.string,
};

export { ChartType };
export default memo(Chart);
