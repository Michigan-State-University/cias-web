import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Box from 'components/Box';
import Circle from 'components/Circle';

import globalMessages from 'global/i18n/globalMessages';
import { StyledText } from './styled';
import { SubstanceUsage } from '../types';

export type SubstanceUsageListProps = {
  substanceUsages: SubstanceUsage[];
  textColor?: CSSProperties['color'];
  wrap?: boolean;
};

export const SubstanceUsageList = ({
  substanceUsages,
  textColor,
  wrap,
}: SubstanceUsageListProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {substanceUsages.map(({ name, consumed }) => (
        <Box
          key={name}
          display="flex"
          align="center"
          mt={substanceUsages.length > 1 ? 8 : 0}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {/* @ts-ignore */}
          <Circle bg={colors.azureBlue} size="5px" doNotShrink />
          <StyledText ml={4} color={textColor} wrap={wrap} ellipsis>
            {`${name}: ${formatMessage(
              globalMessages[consumed ? 'yes' : 'no'],
            )}`}
          </StyledText>
        </Box>
      ))}
    </>
  );
};

export default SubstanceUsageList;
