import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, boxShadows } from 'theme';
import Box from 'components/Box';

export const ToggleableBox = styled(Box)`
  background-color: ${({ isSelected }) =>
    isSelected ? colors.linkWater : colors.white};
  margin-top: 18px;
  box-shadow: ${boxShadows.selago};
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
`;
