import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Box from 'components/Box';
import { colors, boxShadows, themeColors } from 'theme';

export const ToggleableBox = styled(Box)`
  width: 100%;
  margin-top: 18px;
  box-shadow: ${boxShadows.selago};
  border-style: solid;
  border-width: 1px;
  border-color: ${({ isSelected }) =>
    isSelected ? themeColors.secondary : 'transparent'};
  background-color: white;
`;

export const InterventionIndex = styled.div`
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: fit-content;
`;
