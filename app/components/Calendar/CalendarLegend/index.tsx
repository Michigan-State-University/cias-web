import React from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import Text from 'components/Text';

import { themeColors } from 'theme';

import { Dot } from '../Day/styled';
import messages from '../messages';

export const CalendarLegend = () => (
  <Box display="flex">
    <Box display="flex" align="center">
      <Dot blue />
      <Text mr={24} ml={8} textOpacity={0.7} color={themeColors.text}>
        <FormattedMessage {...messages.substanceLegend} />
      </Text>
    </Box>
    <Box display="flex" align="center">
      <Dot blue={false} />
      <Text textOpacity={0.7} color={themeColors.text} ml={8}>
        <FormattedMessage {...messages.noSubstanceLegend} />
      </Text>
    </Box>
  </Box>
);

export default CalendarLegend;
