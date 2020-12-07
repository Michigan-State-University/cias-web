import styled from 'styled-components';
import Box from 'components/Box';
import { boxShadows, themeColors } from 'theme';

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
