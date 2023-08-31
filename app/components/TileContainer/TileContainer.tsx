// @ts-ignore
import styled from 'styled-components';

import { boxShadows, colors, elements, themeColors } from 'theme';

import { style, layout } from 'components/BaseComponentStyles';

const sharedContainerStyles = `
  padding: 15px;
  height: ${elements.interventionsTileHeight}px;
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
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
`;
