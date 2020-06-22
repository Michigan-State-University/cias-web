import styled from 'styled-components';

import { fontSizes, lineHeights, colors } from 'theme';
import { padding, style } from '../BaseComponentStyles';

export const StyledChips = styled.div`
  ${padding};
  ${style};
  background-color: ${colors.azureBackground};
  width: fit-content;
`;

export const ChipsText = styled.p`
  font-size: ${fontSizes.medium};
  line-height: ${lineHeights.regular};
  color: ${colors.azure};
  margin: 0;
`;
