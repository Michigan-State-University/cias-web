import { Roles } from 'models/User/UserRoles';
import navbarNames from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const participantDashboardTabId = interventionsTabId;
export const participantReportsTabId = 'reports';

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

const participantDashboardTab = message => ({
  id: interventionsTabId,
  path: '/',
  message,
});

const participantReportsTab = message => ({
  id: participantReportsTabId,
  path: '/reports',
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
    participantDashboardTab(navbarNames.participantInterventions),
    participantReportsTab(navbarNames.participantReports),
  ],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navbarTabs;
