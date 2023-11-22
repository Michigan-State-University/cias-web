import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';

import SidebarItem from './SidebarItem';

const DefaultSidebar = ({ activeTab, activeSubTab, sidebarTabs }) => (
  <Column width="100%" justify="center">
    {sidebarTabs.map(({ message, id, path, icon, subTabs }) => (
      <SidebarItem
        icon={icon}
        message={message}
        isActive={id === activeTab}
        key={`sidebar-item-${id}`}
        path={path}
        subTabs={subTabs}
        activeSubTab={activeSubTab}
      />
    ))}
  </Column>
);

DefaultSidebar.propTypes = {
  activeTab: PropTypes.string,
  sidebarTabs: PropTypes.array,
  activeSubTab: PropTypes.string,
};

export default DefaultSidebar;
