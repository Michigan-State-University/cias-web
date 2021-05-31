import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import Chart, { ChartType } from 'components/Chart';

import {
  generatePieChartLabel,
  generatePieChartPreviewData,
} from '../generatePieChartData';
import { Y_AXIS_KEY } from '../constants';

const PieChart = ({ defaultPattern, patterns }) => {
  const data = useMemo(
    () => generatePieChartPreviewData([...patterns, defaultPattern]),
    [patterns, defaultPattern],
  );

  const generateCellColor = useCallback(dataItem => dataItem.color, []);

  return (
    <Chart
      type={ChartType.PIE}
      data={data}
      dataKey={Y_AXIS_KEY}
      label={generatePieChartLabel}
      generateCellColor={generateCellColor}
    />
  );
};

PieChart.propTypes = {
  defaultPattern: PropTypes.object,
  patterns: PropTypes.arrayOf(PropTypes.object),
};

export default memo(PieChart);
