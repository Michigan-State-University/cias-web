import styled from 'styled-components';

import Box from 'components/Box';
import { colors, boxShadows, themeColors } from 'theme';

export const ToggleableBox = styled(Box)`
  width: 100%;
  margin-top: 18px;
  box-shadow: ${boxShadows.selago};
  border-style: solid;
  border-width: 1px;
  border-color: ${({ isHovered }) =>
    isHovered ? themeColors.secondary : 'transparent'};
  background-color: white;
  transition: border-color 0.3s;
`;

export const SessionIndex = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ isSessionClosed }) =>
    isSessionClosed ? themeColors.highlight : colors.jungleGreen};
  color: ${({ isSessionClosed }) =>
    isSessionClosed ? themeColors.text : colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-width: 40px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
`;
