import styled from 'styled-components';

import { boxShadows, colors, elements } from 'theme';

import { margin } from 'components/BaseComponentStyles';

export const StyledSidePanel = styled.div`
  width: ${({ width }) => `${width}px`};
  height: 100%;
  background-color: ${colors.white};
  box-shadow: ${({ $isVisible }) => $isVisible && boxShadows.black};
  overflow-y: auto;
`;

export const SidePanelWrapper = styled.div`
  position: fixed;
  display: inline-flex;
  z-index: 1;
  height: calc(100vh - ${elements.navbarHeight}px);
  top: ${elements.navbarHeight}px;
  right: ${({ $isVisible, width }) => ($isVisible ? 0 : `${-width}px`)};
  transition: right 0.4s ease;
`;

export const HandleWrapper = styled.div`
  width: max-content;
  margin-right: 16px;
  margin-top: 16px;
  z-index: 10;
  ${margin};
`;
