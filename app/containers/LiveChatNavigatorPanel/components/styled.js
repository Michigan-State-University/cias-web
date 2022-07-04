import styled from 'styled-components';
import { Col as GCol, Row as GRow } from 'react-grid-system';
import Color from 'color';

import { boxShadows, borders, colors, themeColors } from 'theme';

import TextArea from 'components/Input/TextArea';
import Box from 'components/Box';

import { CHAT_WIDTH, HEADER_HEIGHT } from '../constants';

export const StyledTextArea = styled(TextArea)`
  padding: 12px 42px 12px 16px;
  font-size: 13px;
  line-height: 19px;
  width: 100%;
  height: 100%;
  box-shadow: ${boxShadows.selago};
  border-radius: 8px;
  border-width: ${borders.borderWidth};
  border-style: ${borders.borderStyle};
  border-color: ${({ error }) =>
    error ? themeColors.warning : colors.beauBlue};

  &:focus {
    border-color: ${({ error }) =>
      error ? themeColors.warning : themeColors.primary};
  }
`;

export const NavigatorPanelGridRow = styled(GRow)`
  background-color: ${colors.white};
  padding: 0 24px;
  flex: 1 !important;
  min-height: 0;
  width: 100%;
  max-width: ${CHAT_WIDTH}px;
`;

export const NavigatorPanelGridColumn = styled(GCol)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SectionHeader = styled.div`
  height: ${HEADER_HEIGHT};
  padding: 24px 0;
  border-bottom: 1px solid ${themeColors.highlight};
  text-align: left;
`;

export const SectionBody = styled(Box)`
  flex: 1 !important;
  max-height: calc(100% - ${HEADER_HEIGHT}px);
  border-radius: 0;
`;

export const MessagesSectionContainer = styled(Box)`
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ConversationListItemContainer = styled(Box)`
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ highlighted }) =>
    highlighted ? themeColors.highlight : colors.white};
  &:hover {
    background-color: ${({ highlighted }) =>
      highlighted
        ? themeColors.highlight
        : Color(themeColors.highlight).alpha(0.3)};
  }
  display: flex;
  gap: 16px;
  width: 100%;
`;
