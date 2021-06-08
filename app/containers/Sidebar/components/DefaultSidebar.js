import React from 'react';
import PropTypes from 'prop-types';

import navigationTabs from 'utils/defaultNavbarTabs';

import Column from 'components/Column';

import SidebarItem from './SidebarItem';

const DefaultSidebar = ({ activeTab, userRole }) => (
  <Column width="100%" justify="center">
    {navigationTabs[userRole].map(({ message, id, path, icon }) => (
      <SidebarItem
        icon={icon}
        message={message}
        isActive={id === activeTab}
        key={`sidebar-item-${id}`}
        path={path}
      />
    ))}
  </Column>
);

DefaultSidebar.propTypes = {
  activeTab: PropTypes.string,
  userRole: PropTypes.string,
};

export default DefaultSidebar;
