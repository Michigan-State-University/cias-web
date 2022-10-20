import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Icon from 'components/Icon';

import { SidebarItemLink, SidebarSubItemsContainer } from '../styled';
import SidebarSubItem from './SidebarSubItem';

const SidebarItem = ({
  message,
  icon,
  isActive,
  path,
  subTabs,
  activeSubTab,
}) => (
  <>
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
    {isActive && !isEmpty(subTabs) && (
      <SidebarSubItemsContainer>
        {subTabs.map((subTab) => (
          <SidebarSubItem
            key={subTab.id}
            subTab={subTab}
            isActive={subTab.id === activeSubTab}
          />
        ))}
      </SidebarSubItemsContainer>
    )}
  </>
);

SidebarItem.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  path: PropTypes.string,
  subTabs: PropTypes.array,
  activeSubTab: PropTypes.string,
};

export default SidebarItem;
