// @ts-ignore
import styled from 'styled-components';

import { themeColors } from 'theme';

// @ts-ignore
export const QuickExitPositionWrapper = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  z-index: 1001;
`;

// @ts-ignore
export const QuickExitButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  cursor: pointer;
  border: none;
  background: none;
`;

// @ts-ignore
export const QuickExitButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${themeColors.warning};
  border-radius: 4px 0 0 4px;
`;
