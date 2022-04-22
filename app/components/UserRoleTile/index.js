/**
 *
 * UserRoleTile
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Roles, RolesColors } from 'models/User/UserRoles';
import Box from 'components/Box';
import Text from 'components/Text';
import { colors } from 'theme';
import { injectIntl, IntlShape } from 'react-intl';
import globalMessages from 'global/i18n/globalMessages';

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
      {formatMessage(globalMessages.roles[role])}
    </Text>
  </Box>
);

UserRoleTile.propTypes = {
  role: PropTypes.oneOf([...Roles.allRoles, Roles.guest]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(injectIntl, memo)(UserRoleTile);
