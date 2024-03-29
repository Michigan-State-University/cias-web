/**
 *
 * UserRoleTile
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

import { colors } from 'theme';

import {
  Roles,
  RolesColors,
  PasswordAuthenticatedRoles,
} from 'models/User/RolesManager';

import rolesMessages from 'global/i18n/rolesMessages';

import Box from 'components/Box';
import Text from 'components/Text';

const UserRoleTile = ({ role, disabled, onClick, intl: { formatMessage } }) => (
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
      {formatMessage(rolesMessages[role])}
    </Text>
  </Box>
);

UserRoleTile.propTypes = {
  role: PropTypes.oneOf([...PasswordAuthenticatedRoles, Roles.Guest])
    .isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(injectIntl, memo)(UserRoleTile);
