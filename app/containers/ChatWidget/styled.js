import styled from 'styled-components';

import Box from 'components/Box';

import { mediaQuery, ZIndex } from 'theme';
import {
  CHAT_WIDGET_WIDTH,
  CHAT_WIDGET_MARGIN_DESKTOP,
  CHAT_WIDGET_MARGIN_MOBILE,
  CHAT_WIDGET_MARGIN_TABLET,
} from './constants';

export const Container = styled(Box)`
  position: fixed;
  z-index: ${ZIndex.CHAT_WIDGET};
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  width: ${CHAT_WIDGET_WIDTH}px;
  bottom: ${CHAT_WIDGET_MARGIN_DESKTOP}px;
  right: ${CHAT_WIDGET_MARGIN_DESKTOP}px;
  max-height: calc(100% - ${2 * CHAT_WIDGET_MARGIN_DESKTOP}px);
  max-width: calc(100% - ${2 * CHAT_WIDGET_MARGIN_DESKTOP}px);
  ${mediaQuery.laptopSm`
    bottom: ${CHAT_WIDGET_MARGIN_TABLET}px;
    right: ${CHAT_WIDGET_MARGIN_TABLET}px;
    max-height: calc(100% - ${2 * CHAT_WIDGET_MARGIN_TABLET}px);
    max-width: calc(100% - ${2 * CHAT_WIDGET_MARGIN_TABLET}px);
    `}
  ${mediaQuery.tabletSm`
    bottom: ${CHAT_WIDGET_MARGIN_MOBILE}px;
    right: ${CHAT_WIDGET_MARGIN_MOBILE}px;
    max-height: calc(100% - ${2 * CHAT_WIDGET_MARGIN_MOBILE}px);
    max-width: calc(100% - ${2 * CHAT_WIDGET_MARGIN_MOBILE}px);
    `}
`;
