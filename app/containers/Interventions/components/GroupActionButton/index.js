import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text';
import { themeColors, colors } from 'theme';

const GroupActionButton = ({
  activeIcon,
  inactiveIcon,
  label,
  active,
  action,
}) => (
  <Box
    display="flex"
    mr={20}
    direction="column"
    align="center"
    clickable={active}
    onClick={() => {
      if (active) action();
    }}
  >
    <div>
      <Img
        height={20}
        mb={5}
        src={active ? activeIcon : inactiveIcon}
        alt="icon"
      />
    </div>
    <div>
      <Text color={active ? themeColors.secondary : colors.waterloo} size={12}>
        {label}
      </Text>
    </div>
  </Box>
);

GroupActionButton.propTypes = {
  activeIcon: PropTypes.string,
  inactiveIcon: PropTypes.string,
  label: PropTypes.object,
  active: PropTypes.bool,
  action: PropTypes.func,
};

export default GroupActionButton;
