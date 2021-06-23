import React from 'react';

import { HUNDRED_PERCENT, RADIAN } from 'utils/mathUtils';

import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';

import { HALF_LABEL_HEIGHT, MAX_LABEL_WIDTH } from './constants';

/**
 * @typedef {Object} Pattern
 * @property {string} match
 * @property {string} color
 */

/**
 * @typedef {Pattern} PieChartPattern
 * @property {string} label
 */

/**
 * @param {PieChartPattern[]} patterns
 */
export const generatePieChartPreviewData = patterns => {
  const patternsSize = patterns.length;
  const patternsSizeWithoutDefaultPattern = patternsSize - 1;

  if (patternsSizeWithoutDefaultPattern === 0)
    return [
      {
        name: patterns[0].label,
        value: HUNDRED_PERCENT,
        color: patterns[0].color,
      },
    ];

  const percentForSinglePattern = Math.floor(HUNDRED_PERCENT / patternsSize);

  const percentForDefaultPattern =
    HUNDRED_PERCENT -
    patternsSizeWithoutDefaultPattern * percentForSinglePattern;

  return patterns.map(({ label, color }, index) => {
    const isLastPattern = index === patternsSize - 1;

    return {
      name: label,
      value: isLastPattern ? percentForDefaultPattern : percentForSinglePattern,
      color,
    };
  });
};

export const generatePieChartLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  color,
  value,
}) => {
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const isRightSide = x > cx;

  return (
    <foreignObject
      x={x + (isRightSide ? 0 : -MAX_LABEL_WIDTH)}
      y={y - HALF_LABEL_HEIGHT}
      width="1"
      height="1"
      overflow="visible"
    >
      <Row width={MAX_LABEL_WIDTH} justify={isRightSide ? 'start' : 'end'}>
        <EllipsisText
          maxWidth={MAX_LABEL_WIDTH}
          dataFor="chart-tooltip"
          text={`${name} (${value}%)`}
          color={color}
        />
      </Row>
    </foreignObject>
  );
};
