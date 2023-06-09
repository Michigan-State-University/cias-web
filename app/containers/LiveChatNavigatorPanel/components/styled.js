import styled from 'styled-components';
import { Col as GCol, Row as GRow } from 'react-grid-system';
import Row from 'components/Row';

import { colors, themeColors } from 'theme';

import Box from 'components/Box';

import { HEADER_HEIGHT, INTERLOCUTOR_INFO_HEIGHT } from '../constants';

export const NavigatorPanelGridRow = styled(GRow)`
  background-color: ${colors.white};
  padding: 0 24px;
  flex: 1 !important;
  min-height: 0;
  width: 100%;
`;

export const NavigatorPanelGridColumn = styled(GCol)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SectionHeaderContainer = styled(Box)`
  height: ${HEADER_HEIGHT}px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${themeColors.highlight};
  border-radius: 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionBody = styled(Box)`
  flex: 1 !important;
  height: calc(100% - ${HEADER_HEIGHT}px - ${INTERLOCUTOR_INFO_HEIGHT}px);
  border-radius: 0;
`;

export const MessagesSectionContainer = styled(Box)`
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LabelRow = styled(Row)`
  & > div {
    text-align: left;
  }
`;
