import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import Box from 'components/Box';

import Chart, { ChartType } from 'components/Chart';

import { ChartStatus } from 'global/reducers/dashboardSections';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import {
  generatePieChartLabel,
  generatePieChartPreviewData,
} from '../generatePieChartData';
import { Y_AXIS_KEY } from '../constants';
import messages from '../messages';

const PieChart = ({
  defaultPattern,
  patterns,
  realChartData,
  formatMessage,
  status,
}) => {
  const data = useMemo(() => {
    if (!realChartData && status === ChartStatus.PUBLISHED) return null;
    if (!realChartData)
      return generatePieChartPreviewData([...patterns, defaultPattern]);
    if (realChartData) {
      return realChartData;
    }
  }, [patterns, defaultPattern, realChartData, status]);

  const generateCellColor = useCallback(dataItem => dataItem.color, []);

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
  realChartData: PropTypes.any,
  formatMessage: PropTypes.func,
  status: PropTypes.string,
};

export default memo(PieChart);
