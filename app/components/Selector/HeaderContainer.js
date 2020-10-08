import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { themeColors } from 'theme';

const HeaderContainer = ({ children, onClick, disabled }) => (
  <Text
    color={themeColors.secondary}
    fontWeight="bold"
    clickable
    disabled={disabled}
    onClick={() => !disabled && onClick()}
  >
    {children}
  </Text>
);

HeaderContainer.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default HeaderContainer;
