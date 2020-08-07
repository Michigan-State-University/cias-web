import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HoverableBox from 'components/Box/HoverableBox';
import { colors } from 'theme';

export const ToggleableBox = styled(HoverableBox)`
  background-color: ${({ isSelected }) =>
    isSelected ? colors.linkWater : colors.white};
  margin-top: 18px;
  box-shadow: 0px 4px 20px #e3eefb;
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
  margin: 0 10px;
  position: relative;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
