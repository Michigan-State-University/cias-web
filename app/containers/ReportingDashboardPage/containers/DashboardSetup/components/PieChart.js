import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'recharts';

import Chart, { ChartType } from 'components/Chart';

import {
  generatePieChartLabel,
  generatePieChartPreviewData,
} from '../generatePieChartData';

const PieChart = ({ defaultPattern, patterns }) => {
  const data = useMemo(
    () => generatePieChartPreviewData([...patterns, defaultPattern]),
    [patterns, defaultPattern],
  );

  return (
    <Chart
      type={ChartType.PIE}
      data={data}
      dataKey="value"
      label={generatePieChartLabel}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Chart>
  );
};

PieChart.propTypes = {
  defaultPattern: PropTypes.object,
  patterns: PropTypes.arrayOf(PropTypes.object),
};

export default memo(PieChart);
