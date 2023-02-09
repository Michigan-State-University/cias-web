import styled from 'styled-components';

import { boxShadows, colors, elements, ZIndex } from 'theme';

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
  z-index: ${ZIndex.SIDE_PANEL_WRAPPER};
  height: calc(100vh - ${elements.navbarHeight}px);
  top: ${elements.navbarHeight}px;
  right: ${({ $isVisible, width }) => ($isVisible ? 0 : `${-width}px`)};
  transition: right 0.4s ease;
`;

export const HandleWrapper = styled.div`
  width: max-content;
  margin-right: 16px;
  margin-top: 16px;
  z-index: ${ZIndex.SIDE_PANEL_HANDLE_WRAPPER};
  ${margin};
`;
