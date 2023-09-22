// @ts-ignore
import styled from 'styled-components';

import { boxShadows, colors, elements, themeColors } from 'theme';

import { style, layout, flex } from 'components/BaseComponentStyles';

const sharedContainerStyles = `
  padding: 12px 16px 16px 16px;
  height: ${elements.interventionTileHeight}px;
  box-shadow: ${boxShadows.selago};
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  color: ${themeColors.text};
`;

// @ts-ignore
export const TileContainer = styled.div`
  ${sharedContainerStyles};
  background: ${colors.white};
  color: ${colors.black};
  justify-content: space-between;
  ${style}
  ${layout}
  ${flex}
`;
