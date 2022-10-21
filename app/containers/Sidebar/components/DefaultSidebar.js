import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';

import navigationTabs from 'models/User/RolesManager/defaultNavbarTabs';

import Column from 'components/Column';

import SidebarItem from './SidebarItem';

const DefaultSidebar = ({ activeTab, activeSubTab, userRoles }) => {
  const sidebarTabs = useMemo(
    () =>
      uniqBy(
        flatten(
          userRoles?.reduce(
            (tabs, userRole) => [...tabs, navigationTabs[userRole]],
            [],
          ) || [],
        ),
        'id',
      ),
    [userRoles],
  );
  return (
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
};

DefaultSidebar.propTypes = {
  activeTab: PropTypes.string,
  userRoles: PropTypes.array,
  activeSubTab: PropTypes.string,
};

export default DefaultSidebar;
