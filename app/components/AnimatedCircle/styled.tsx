// @ts-ignore
import styled from 'styled-components';

import { themeColors } from 'theme';

// @ts-ignore
export const AnimatedCircleContainer = styled.svg`
  // Flip the svg and make the animation go anti-clockwise
  transform: scaleX(-1);
`;

export type AnimationProps = {
  durationMs: number;
  startMs: number;
  strokeDasharray: number;
  strokeWidth: number;
};

// @ts-ignore
export const Animation = styled.path`
  stroke-width: ${({ strokeWidth }: AnimationProps) => strokeWidth}px;
  stroke: ${themeColors.primary};
  stroke-linecap: round;

  // Start animation at the top of the circle
  transform: rotate(90deg);
  transform-origin: center;

  stroke-dasharray: ${({ strokeDasharray }: AnimationProps) =>
    strokeDasharray}px;
  stroke-dashoffset: ${({
    startMs,
    durationMs,
    strokeDasharray,
  }: AnimationProps) => (1 - startMs / durationMs) * strokeDasharray}px;

  @keyframes progress {
    from {
      stroke-dashoffset: ${({
        startMs,
        durationMs,
        strokeDasharray,
      }: AnimationProps) => (1 - startMs / durationMs) * strokeDasharray}px;
    }
    to {
      stroke-dashoffset: ${({ strokeDasharray }: AnimationProps) =>
        strokeDasharray}px;
    }
  }

  animation: progress ${({ startMs }: AnimationProps) => startMs}ms linear;
`;
