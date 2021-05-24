import React from 'react';

import { RADIAN } from 'components/Chart';

const HUNDRED_PERCENT = 100;

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

  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name} ({`${value}%`})
    </text>
  );
};
