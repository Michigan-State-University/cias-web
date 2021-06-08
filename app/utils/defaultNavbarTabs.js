import { Roles } from 'models/User/UserRoles';

import folder from 'assets/svg/folder.svg';
import peopleHR from 'assets/svg/peopleHR.svg';
import peopleHRCircle from 'assets/svg/peopleHRCircle.svg';

import navbarNames from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const teamsTabId = 'teams';
export const myTeamTabId = 'myTeam';
export const participantDashboardTabId = interventionsTabId;
export const participantReportsTabId = 'reports';

const interventionsTab = (message, icon) => ({
  id: interventionsTabId,
  path: '/',
  message,
  icon,
});

const accountsTab = (message, icon) => ({
  id: accountsTabId,
  path: '/users',
  message,
  icon,
});

const teamsTab = (message, icon) => ({
  id: teamsTabId,
  path: '/teams',
  message,
  icon,
});

const navigationTabs = {
  [Roles.admin]: [
    interventionsTab(navbarNames.adminInterventions, folder),
    accountsTab(navbarNames.adminAccounts, peopleHR),
    teamsTab(navbarNames.adminTeams, peopleHRCircle),
  ],
  [Roles.teamAdmin]: [
    interventionsTab(navbarNames.adminInterventions, folder),
    teamsTab(navbarNames.adminTeams, peopleHRCircle),
  ],
  [Roles.researcher]: [
    interventionsTab(navbarNames.researcherInterventions, folder),
    accountsTab(navbarNames.researcherAccounts, peopleHR),
  ],
  [Roles.eInterventionAdmin]: [
    interventionsTab(navbarNames.researcherInterventions),
    accountsTab(navbarNames.researcherAccounts),
  ],
  [Roles.organizationAdmin]: [],
  [Roles.healthSystemAdmin]: [],
  [Roles.clinicAdmin]: [],
  [Roles.participant]: [],
  [Roles.thirdParty]: [],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navigationTabs;
