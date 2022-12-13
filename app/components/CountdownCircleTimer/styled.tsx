// @ts-ignore
import styled from 'styled-components';

import { themeColors } from 'theme';
import {
  TIMER_ANIMATED_CIRCLE_OUTER_RADIUS,
  TIMER_INNER_CIRCLE_RADIUS,
} from './constants';

// @ts-ignore
export const CountdownTimerContainer = styled.div`
  position: relative;
  width: ${2 * TIMER_ANIMATED_CIRCLE_OUTER_RADIUS}px;
  height: ${2 * TIMER_ANIMATED_CIRCLE_OUTER_RADIUS}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// @ts-ignore
export const InnerCircle = styled.div`
  position: relative;
  width: ${2 * TIMER_INNER_CIRCLE_RADIUS}px;
  height: ${2 * TIMER_INNER_CIRCLE_RADIUS}px;
  border-radius: 50%;
  background-color: ${themeColors.primary}10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
