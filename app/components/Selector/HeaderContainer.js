import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { themeColors } from 'theme';

const HeaderContainer = ({ children, onClick }) => (
  <Text
    color={themeColors.secondary}
    fontWeight="bold"
    clickable
    onClick={onClick}
  >
    {children}
  </Text>
);

HeaderContainer.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default HeaderContainer;
