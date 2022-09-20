import React from 'react';

import { NavbarSubTab } from 'models/User/RolesManager';

import { SidebarSubItemLink } from '../styled';

export type Props = {
  subTab: NavbarSubTab;
  isActive: boolean;
};

const SidebarSubItem = ({ subTab, isActive }: Props) => {
  const { path, message } = subTab;

  return (
    <SidebarSubItemLink $isActive={isActive} to={isActive ? '#' : path}>
      {message}
    </SidebarSubItemLink>
  );
};

export default SidebarSubItem;
