import styled from 'styled-components';

import Box from 'components/Box';

import { ZIndex } from 'theme';
import { CHAT_WIDGET_WIDTH, CHAT_WIDGET_MARGIN } from './constants';

export const Container = styled(Box)`
  position: fixed;
  z-index: ${ZIndex.CHAT_WIDGET};
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  width: ${CHAT_WIDGET_WIDTH}px;
  bottom: ${CHAT_WIDGET_MARGIN}px;
  right: ${CHAT_WIDGET_MARGIN}px;
  max-height: calc(100% - ${2 * CHAT_WIDGET_MARGIN}px);
  max-width: calc(100% - ${2 * CHAT_WIDGET_MARGIN}px);
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
`;
