import styled from 'styled-components';
import { Handle } from 'react-flow-renderer';

import { colors } from 'theme';

import { sessionMapColors } from '../constants';

export const ScrollbarContainer = styled.div.attrs(() => {})`
  height: ${({ horizontal }) => (horizontal ? '25px' : '100%')};
  width: ${({ horizontal }) => (!horizontal ? '25px' : '100%')};
  position: relative;
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'column' : 'row')};
  justify-content: flex-end;
`;

// !important used to override library styles
export const TargetHandle = styled(Handle)`
  opacity: 0;
  cursor: default !important;
`;

export const SourceHandle = styled(Handle)`
  cursor: default !important;
  background: ${colors.white} !important;
  border-color: ${sessionMapColors.edgeBase} !important;
  border-width: 2px !important;
  width: 10px !important;
  height: 10px !important;
`;
