import styled from 'styled-components';

import { colors, themeColors } from 'theme';

import Box from 'components/Box';

export const StyledTextBlock = styled(Box)`
  padding-left: 10px;
  border-radius: 0;
  border-left: ${({ isCurrent }) =>
      isCurrent ? themeColors.secondary : 'transparent'}
    solid 2px;
`;

export const TranscriptBox = styled(Box)`
  background-color: ${colors.aliceBlue};
  border: ${colors.linkWater} solid 1px;
  padding: 16px;
  height: 100%;
`;
