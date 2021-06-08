import React from 'react';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Icon from 'components/Icon';

import { SidebarItemLink } from '../styled';

const SidebarItem = ({ message, icon, isActive, path }) => (
  <SidebarItemLink $isActive={isActive} to={isActive ? '#' : path}>
    {icon && (
      <Icon
        src={icon}
        mr={8}
        fill={isActive ? themeColors.secondary : undefined}
      />
    )}
    <Text fontSize={15} fontWeight="bold">
      {message}
    </Text>
  </SidebarItemLink>
);

SidebarItem.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  path: PropTypes.string,
};

export default SidebarItem;
