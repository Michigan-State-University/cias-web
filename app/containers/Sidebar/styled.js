import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { borders, boxShadows, elements, themeColors } from 'theme';
import { decimalToHex } from 'utils/hexUtils';

import { margin } from 'components/BaseComponentStyles';

export const SidebarStyled = styled.div`
  width: ${elements.sidebarWidth}px;
  height: 100vh;
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
