import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Box from 'components/Box';
import { colors, boxShadows, themeColors } from 'theme';
import Row from 'components/Row';
import H2 from 'components/H2';

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
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    ${H2} {
      color: ${themeColors.secondary} !important;
    }

    ${ToggleableBox} {
      background-color: black !important;
    }
  }
`;

export const StyledRow = styled(Row)`
  width: 100%;
  &:hover * {
    ${InterventionIndex} {
      color: white;
    }
  }
`;
