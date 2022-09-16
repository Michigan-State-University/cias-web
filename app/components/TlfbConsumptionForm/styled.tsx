// @ts-ignore
import styled from 'styled-components';

import { colors, hexToRgb } from 'theme';

// @ts-ignore
export const OptionContainer = styled.div`
  padding: 16px 12px;
  width: 100%;
  background-color: rgba(${hexToRgb(colors.periwinkleGray)}, 0.2);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
