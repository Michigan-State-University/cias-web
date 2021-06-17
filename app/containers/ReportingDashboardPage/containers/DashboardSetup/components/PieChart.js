import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import Chart, { ChartType } from 'components/Chart';

import {
  generatePieChartLabel,
  generatePieChartPreviewData,
} from '../generatePieChartData';
import { Y_AXIS_KEY } from '../constants';

const PieChart = ({ defaultPattern, patterns, singleChartData }) => {
  const data = useMemo(() => {
    if (!singleChartData)
      return generatePieChartPreviewData([...patterns, defaultPattern]);
    if (singleChartData) {
      return singleChartData;
    }
  }, [patterns, defaultPattern, singleChartData]);

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
  singleChartData: PropTypes.any,
};

export default memo(PieChart);
