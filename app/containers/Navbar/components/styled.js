import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themeColors, colors, hexToRgb } from 'theme';
import { margin } from 'components/BaseComponentStyles';
import Row from 'components/Row';
import { maxQueries } from 'components/Container/mediaQuery';
import Circle from 'components/Circle';

export const StyledLink = styled(Link)`
  font-size: 13px;
  font-weight: bold;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const SaveInfoContainer = styled.div`
  font-size: 13px;
  font-weight: bold;
  width: 110px;
`;

export const SavingContainer = styled.div`
  display: flex;
  align-items: center;
  div {
    margin: 0 5px;
  }
`;

export const CheckBackground = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 5px;
`;

export const NavbarTabLink = styled(Link)`
  text-decoration: none;
  ${(props) =>
    props.active &&
    `
      border-bottom: 2px solid ${themeColors.secondary};
    `}
  span {
    ${(props) =>
      !props.active &&
      `
        opacity: 0.6  ;
      `}
  }
  ${margin};
`;

export const MenuContent = styled.div`
  position: absolute;
  min-width: 150px;
  top: calc(100% - 20px);
  left: calc(100% - 215px);
  background-color: ${colors.white};
  text-align: center;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 0px 50px rgba(${hexToRgb(colors.black)}, 0.08);
  padding-bottom: 10px;
  opacity: ${({ menuVisible }) => (menuVisible ? '100%' : '0')};
  transition: opacity 0.3s;
`;

export const StyledLogos = styled(Row)`
  @media ${maxQueries.sm} {
    justify-content: start;

    img {
      width: 70%;
      margin: 0;
    }
  }
`;

export const StyledCircle = styled(Circle)`
  color: ${colors.white} !important;
`;
