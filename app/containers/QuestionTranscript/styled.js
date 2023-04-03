import styled from 'styled-components';

import { colors, themeColors } from 'theme';

import { LanguageDirection } from 'global/types/locale';

import Box from 'components/Box';

export const StyledTextBlock = styled(Box)`
  border-radius: 0;

  // Current text indicator
  ${({ dir, isCurrent }) => `${
    dir === LanguageDirection.LTR ? 'border-left' : 'border-right'
  }:
    ${isCurrent ? themeColors.secondary : 'transparent'}
    solid 2px;`}

  // Space between current text indicator and the text
  ${({ dir }) =>
    `${dir === LanguageDirection.LTR ? 'padding-left' : 'padding-right'}: 10px`}
`;

export const TranscriptBox = styled(Box)`
  background-color: ${colors.aliceBlue};
  border: ${colors.linkWater} solid 1px;
  padding: 16px;
  height: 100%;
`;
