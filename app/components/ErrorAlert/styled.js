import styled from 'styled-components';

import { colors, borders } from 'theme';
import { margin, padding, flex, layout } from 'components/BaseComponentStyles';

const transparentFlamingo = 'rgba(239, 70, 47, 0.3)';

export const AlertContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 700px;
  background-color: ${transparentFlamingo};
  border: ${borders.borderWidth} ${borders.borderStyle} ${colors.flamingo};
  border-radius: 5px;
  display: flex;
  align-items: center;
  ${margin};
  ${padding};
  ${flex};
  ${layout};
`;
