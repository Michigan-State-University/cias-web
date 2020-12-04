import { Roles } from 'models/User/UserRoles';
import navbarNames from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';

const interventionsTab = message => ({
  id: interventionsTabId,
  path: '/',
  message,
});

const accountsTab = message => ({
  id: accountsTabId,
  path: '/users',
  message,
});

const navbarTabs = {
  [Roles.admin]: [
    interventionsTab(navbarNames.adminInterventions),
    accountsTab(navbarNames.adminAccounts),
  ],
  [Roles.researcher]: [
    interventionsTab(navbarNames.researcherInterventions),
    accountsTab(navbarNames.researcherAccounts),
  ],
  [Roles.participant]: [
    {
      message: navbarNames.participantInterventions,
    },
  ],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navbarTabs;
