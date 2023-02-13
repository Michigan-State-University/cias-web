// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import Color from 'color';

import { themeColors, colors } from 'theme';

import Row from 'components/Row';
import Box from 'components/Box';

export type InfoBoxContainerProps = {
  active: boolean;
};

// @ts-ignore
export const InfoBoxContainer: FC<InfoBoxContainerProps> = styled(Box)`
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ active }: InfoBoxContainerProps) =>
    active ? themeColors.highlight : colors.white};

  &:hover {
    background-color: ${({ active }: InfoBoxContainerProps) =>
      active ? themeColors.highlight : Color(themeColors.highlight).alpha(0.3)};
  }

  display: flex;
  gap: 16px;
  width: 100%;
`;

// @ts-ignore
export const LabelRow = styled(Row)`
  width: 100%;

  * {
    line-height: 1;
  }

  & > div {
    text-align: left;
  }
`;
