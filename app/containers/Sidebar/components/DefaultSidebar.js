import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';

import navigationTabs from 'utils/defaultNavbarTabs';

import Column from 'components/Column';

import SidebarItem from './SidebarItem';

const DefaultSidebar = ({ activeTab, userRoles }) => {
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
      {sidebarTabs.map(({ message, id, path, icon }) => (
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
};

DefaultSidebar.propTypes = {
  activeTab: PropTypes.string,
  userRoles: PropTypes.array,
};

export default DefaultSidebar;
