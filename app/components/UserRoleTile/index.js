/**
 *
 * UserRoleTile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

import { Roles, RolesColors } from 'models/User/UserRoles';
import Box from 'components/Box';
import Text from 'components/Text';
import { colors } from 'theme';

const UserRoleTile = ({ role, disabled, onClick }) => (
  <Box
    display="inline-flex"
    width="max-content"
    bg={disabled ? colors.grey : RolesColors[role]}
    justify="center"
    align="center"
    px={10}
    py={5}
    clickable={!!onClick}
    onClick={onClick}
  >
    <Text fontWeight="bold" fontSize={14} color={colors.white}>
      {upperFirst(role)}
    </Text>
  </Box>
);

UserRoleTile.propTypes = {
  role: PropTypes.oneOf([...Roles.allRoles, Roles.guest]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(UserRoleTile);
