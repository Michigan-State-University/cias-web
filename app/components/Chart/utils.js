import regression from 'regression';
import range from 'lodash/range';

import { TREND_LINE_DATA_KEY } from './constants';

export const generateBarChartTrendData = (data, yKey) => {
  const trendParams = range(data.length).map(index => [
    index,
    data[index][yKey],
  ]);
  const rawTrendData = regression.polynomial(trendParams, { order: 3 });

  return rawTrendData.points.map(([, y]) => ({ [TREND_LINE_DATA_KEY]: y }));
};
