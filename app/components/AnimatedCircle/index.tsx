import React, { memo } from 'react';

import { themeColors } from 'theme';

import { calculateCircleCircumference } from 'utils/mathUtils';

import { Animation, AnimatedCircleContainer } from './styled';

export type Props = {
  animationDurationMs: number;
  animationStartMs: number;
  outerRadius: number;
  innerRadius: number;
};

const AnimatedCircle = ({
  animationDurationMs,
  animationStartMs,
  outerRadius,
  innerRadius,
}: Props) => {
  const outerDiameter = 2 * outerRadius;
  const innerDiameter = 2 * innerRadius;
  const strokeWidth = outerRadius - innerRadius;
  const strokeDasharray = calculateCircleCircumference(innerRadius);

  return (
    <AnimatedCircleContainer
      viewBox={`0 0 ${outerDiameter} ${outerDiameter}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="none">
        <circle
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius}
          strokeWidth={outerRadius - innerRadius}
          stroke={`${themeColors.primary}10`}
        />
        <Animation
          durationMs={animationDurationMs}
          startMs={animationStartMs}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          d={`M ${outerRadius}, ${outerRadius}
              m -${innerRadius}, 0
              a ${innerRadius},${innerRadius} 0 1,0 ${innerDiameter},0
              a ${innerRadius},${innerRadius} 0 1,0 -${innerDiameter},0`}
        />
      </g>
    </AnimatedCircleContainer>
  );
};

export default memo(AnimatedCircle);
