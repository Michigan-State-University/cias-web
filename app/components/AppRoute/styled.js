import styled from 'styled-components';
import { Row, Container } from 'react-grid-system';

import { elements } from 'theme';

export const PageContainer = styled(Container)`
  padding: 0 !important;
  margin: 0 !important;
`;

export const MainAppContainer = styled.div`
  position: relative;
  margin-top: ${elements.navbarHeight}px;
  height: calc(100vh - ${elements.navbarHeight}px) !important;
  width: ${({ $isSidebarVisible }) =>
    `calc(100vw - ${$isSidebarVisible ? elements.sidebarWidth : 0}px)`};
  overflow: auto;

  @media only screen and (max-width: 1280px) {
    width: 100vw;
  }
`;

export const RowBelowNavbar = styled(Row)`
  overflow: hidden;
`;
