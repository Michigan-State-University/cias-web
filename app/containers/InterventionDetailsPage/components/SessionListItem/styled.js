import styled from 'styled-components';

import Box from 'components/Box';
import { colors, boxShadows, themeColors } from 'theme';
import Row from 'components/Row';

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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.jungleGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-width: 30px;
`;

export const StyledRow = styled(Row)`
  width: 70%;
  &:hover * {
    ${SessionIndex} {
      color: white;
    }
  }
`;
