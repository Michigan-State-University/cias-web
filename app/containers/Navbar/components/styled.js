import styled from 'styled-components';

import { colors } from 'theme';

export const CrossContainer = styled.div`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.linkWater};
  margin-right: 35px;
  cursor: pointer;
`;
