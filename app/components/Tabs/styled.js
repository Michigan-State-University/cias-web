import styled from 'styled-components';

import { themeColors } from 'theme';
import { flex, layout } from '../BaseComponentStyles';

export const TabsContainer = styled.div`
  ${flex};
  ${layout};
`;

export const ContentContainer = styled.div`
  margin: 25px 10px;
`;

export const LabelContainer = styled.div`
  margin: 0 10px;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom-width: 2px;
  border-bottom-color: ${themeColors.secondary};
  border-bottom-style: ${({ isActive }) => (isActive ? 'solid' : 'none')};
`;
