import styled from 'styled-components';

import { borders, hexToRgb, themeColors } from 'theme';
import { margin, padding, flex, layout } from 'components/BaseComponentStyles';

const transparentWarning = `rgba(${hexToRgb(themeColors.warning)}, 0.3)`;

export const AlertContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 700px;
  background-color: ${transparentWarning};
  border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.warning};
  border-radius: 5px;
  display: flex;
  align-items: center;
  ${margin};
  ${padding};
  ${flex};
  ${layout};
`;
