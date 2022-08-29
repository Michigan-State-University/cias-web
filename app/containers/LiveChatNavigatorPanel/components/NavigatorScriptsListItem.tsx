import React from 'react';

import { colors } from 'theme';

import Row from 'components/Row';
import Text from 'components/Text';
import Box from 'components/Box';

export type Props = {
  sampleMessage: string;
};

const NavigatorScriptsListItem = ({ sampleMessage }: Props) => (
  <Row>
    <Box
      width="2px"
      bg={colors.orchid}
      borderRadius={0}
      mr={8}
      flexShrink={0}
    />
    <Text lineHeight="22px" fontWeight="medium">
      {sampleMessage}
    </Text>
  </Row>
);

export default NavigatorScriptsListItem;
