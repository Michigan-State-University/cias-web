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
  background-color: ${colors.surfieGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const StyledRow = styled(Row)`
  width: 100%;
  &:hover * {
    ${SessionIndex} {
      color: white;
    }
  }
`;
