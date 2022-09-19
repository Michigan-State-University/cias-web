import styled from 'styled-components';

import { colors, hexToRgb } from 'theme';

export const ContentContainer = styled.div`
  padding: 16px 12px;
  width: 100%;
  background-color: rgba(${hexToRgb(colors.periwinkleGray)}, 0.2);
  border-radius: 5px;
`;
