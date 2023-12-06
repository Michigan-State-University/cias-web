// @ts-ignore
import styled from 'styled-components';

import { boxShadows, colors, elements, themeColors } from 'theme';

import { style, layout, flex } from 'components/BaseComponentStyles';

export type Props = {
  disabled?: boolean;
};

// @ts-ignore
export const TileContainer = styled.div`
  padding: 12px 16px 16px 16px;
  height: ${elements.interventionTileHeight}px;
  box-shadow: ${boxShadows.selago};
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  color: ${themeColors.text};
  background: ${colors.white};
  color: ${colors.black};
  justify-content: space-between;
  cursor: ${({ disabled }: Props) => (disabled ? 'not-allowed' : 'pointer')};
  ${style}
  ${layout}
  ${flex}
  opacity: 1;
`;
