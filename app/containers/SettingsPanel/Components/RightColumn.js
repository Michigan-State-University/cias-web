import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Column from 'components/Column';
import Text from 'components/Text';
import { colors, borders } from 'theme';

const RightColumn = ({ state }) => (
  <Column>
    <Box
      height="100%"
      width="100%"
      bg={colors.zirkon}
      border={`${borders.borderWidth} ${borders.borderStyle} ${
        colors.linkWater
      }`}
      px={30}
      py={25}
    >
      <Text fontSize={15} fontWeight="bold">
        {state.label}
      </Text>
      <Text mt={12} fontSize={15}>
        {state.sublabel}
      </Text>
    </Box>
  </Column>
);

RightColumn.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.node,
    sublabel: PropTypes.node,
  }),
};

export default RightColumn;
