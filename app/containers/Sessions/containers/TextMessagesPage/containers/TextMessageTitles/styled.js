import styled from 'styled-components';
import { colors, themeColors } from 'theme';
import { Container } from 'react-grid-system';

export const StyledTile = styled.div`
  flex: 0 0 28%;
  width: 240px;
  height: 132px;
  background-color: ${colors.white};
  box-shadow: 0 4px 20px #e3eefb;
  border-radius: 5px;
  margin: 20px;
  padding: 24px;
  border-width: 1px;
  border-color: ${({ active }) =>
    active ? themeColors.secondary : colors.white};
  border-style: solid;
  transition: border-color 0.7s linear;
  cursor: pointer;
  &:hover {
    border-width: 1px;
    border-color: ${themeColors.secondary};
  }
`;

export const StyledCreateTile = styled.div`
  flex: 0 0 28%;
  width: 240px;
  height: 132px;
  background-color: ${themeColors.secondary};
  border-radius: 5px;
  margin: 20px;
  cursor: pointer;
`;

export const StyledEmptyTile = styled.div`
  flex: 0 0 28%;
  width: 240px;
  height: 132px;
  background-color: ${colors.linkWater};
  border-radius: 5px;
  margin: 20px;
`;

export const StyledTilesContainer = styled(Container)`
  margin-top: 10px;
  padding: 0 !important;
  justify-content: center !important;
  overflow: scroll;
  height: calc(100vh - 80px);
`;
