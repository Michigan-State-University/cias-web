import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { borders, boxShadows, elements, themeColors } from 'theme';
import { decimalToHex } from 'utils/hexUtils';

import { margin } from 'components/BaseComponentStyles';
import { ShowHiddenContentButton } from 'components/ShowHiddenContentButton';

export const SidebarStyled = styled.div`
  width: ${elements.sidebarWidth}px;
  top: 0;
  background-color: white;
  padding: 20px;
  box-shadow: ${boxShadows.black};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
  margin-top: ${elements.navbarHeight}px;
  height: calc(100vh - ${elements.navbarHeight}px);
  transition: left 0.4s ease;

  @media only screen and (max-width: 1280px) {
    position: fixed;
    left: calc(0px - ${elements.sidebarWidth}px);
    ${({ isVisible }) => (isVisible ? 'left: 0;' : '')}
  }
`;

export const SidebarItemLink = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: 8px;
  width: max-content;

  ${({ $isActive }) =>
    $isActive
      ? {
          backgroundColor: `${themeColors.secondary}${decimalToHex(20)}`,
          borderRadius: borders.borderRadius,
          '*': { color: themeColors.secondary },
        }
      : {}}

  ${margin};
`;

export const ShowSidebarButton = styled(ShowHiddenContentButton)`
  position: absolute;
  top: 16px;
  right: -40px;
  box-shadow: 20px 0 20px rgba(0, 0, 0, 0.08);
  @media only screen and (min-width: 1400px) {
    display: none;
  }
`;
