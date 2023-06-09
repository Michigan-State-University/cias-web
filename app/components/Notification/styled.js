import styled from 'styled-components';

import { fontSizes, lineHeights, colors } from 'theme';
import { padding, style } from '../BaseComponentStyles';

export const StyledChips = styled.div.attrs((props) => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  width: fit-content;
  max-height: 30px;
  margin-right: 10px;
  margin-top: 12px;
  ${padding};
  ${style};
  ${({ disabled }) => disabled && { cursor: 'not-allowed', opacity: 0.5 }};
`;

export const ChipsText = styled.p`
  font-size: ${fontSizes.medium};
  line-height: ${lineHeights.regular};
  color: ${({ isActive }) => (isActive ? colors.white : colors.azure)};
`;
