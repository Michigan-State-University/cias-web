// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import Color from 'color';

import { themeColors, colors } from 'theme';

import Box from 'components/Box';

export type Props = {
  highlighted: boolean;
};

// @ts-ignore
export const ConversationInfoBoxContainer: FC<Props> = styled(Box)`
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ highlighted }: Props) =>
    highlighted ? themeColors.highlight : colors.white};

  &:hover {
    background-color: ${({ highlighted }: Props) =>
      highlighted
        ? themeColors.highlight
        : Color(themeColors.highlight).alpha(0.3)};
  }

  display: flex;
  gap: 16px;
  width: 100%;
`;
