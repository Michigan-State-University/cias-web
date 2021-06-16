import styled from 'styled-components';

import { borders, colors, hexToRgb, themeColors } from 'theme';

import { Container, NoMarginRow, Row } from 'components/ReactGridSystem';

export const SettingsContainer = styled(Container)`
  margin: 0;
  padding: 32px 24px !important;
`;

export const FullWidthContainer = styled(Container)`
  max-width: 100% !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
`;

export const EntityRow = styled(Row)`
  padding: 10px;
  margin: 0 !important;
  border-radius: ${borders.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${colors.linkWater};
  }

  background-color: ${({ $isSelected }) =>
    $isSelected && `rgb(${hexToRgb(themeColors.secondary)}, 0.2) !important`};
`;

export const UserRow = styled(NoMarginRow)`
  cursor: pointer;
`;
