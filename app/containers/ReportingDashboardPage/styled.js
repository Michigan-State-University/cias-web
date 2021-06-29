import styled from 'styled-components';

import { borders, colors, hexToRgb, themeColors } from 'theme';

import { Container, NoMarginRow, Row } from 'components/ReactGridSystem';

const hoverStyles = ({ $isDeleted }) => {
  if ($isDeleted)
    return {
      cursor: 'not-allowed',
    };

  return {
    backgroundColor: colors.linkWater,
  };
};

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

export const EntityRow = styled(Row).attrs(({ $isDeleted, onClick }) => ({
  onClick: $isDeleted ? undefined : onClick,
}))`
  padding: 10px;
  margin: 0 !important;
  border-radius: ${borders.borderRadius};
  cursor: pointer;
  &:hover {
    ${hoverStyles};
  }

  background-color: ${({ $isSelected }) =>
    $isSelected && `rgb(${hexToRgb(themeColors.secondary)}, 0.2) !important`};
`;

export const UserRow = styled(NoMarginRow)`
  ${({ $active }) => $active && `cursor: pointer`};
`;
