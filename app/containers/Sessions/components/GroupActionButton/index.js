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
  disabled,
}) => {
  const actionPossible = active && !disabled;

  return (
    <Box
      display="flex"
      direction="column"
      align="center"
      justify="center"
      clickable={actionPossible}
      onClick={() => {
        if (actionPossible) action();
      }}
      bg={colors.orchid}
      bgOpacity={0.05}
      px={6}
      py={8}
      minWidth={92}
    >
      <div>
        <Img
          height={20}
          mb={5}
          src={actionPossible ? activeIcon : inactiveIcon}
          alt="icon"
        />
      </div>
      <div>
        <Text
          color={actionPossible ? themeColors.secondary : colors.waterloo}
          size={12}
          textAlign="center"
          fontWeight="medium"
        >
          {label}
        </Text>
      </div>
    </Box>
  );
};

GroupActionButton.propTypes = {
  activeIcon: PropTypes.string,
  inactiveIcon: PropTypes.string,
  label: PropTypes.object,
  active: PropTypes.bool,
  action: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GroupActionButton;
