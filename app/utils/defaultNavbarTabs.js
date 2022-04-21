import { Roles } from 'models/User/UserRoles';

import folder from 'assets/svg/folder.svg';
import peopleHR from 'assets/svg/peopleHR.svg';
import peopleHRCircle from 'assets/svg/peopleHRCircle.svg';
import fileBarChart from 'assets/svg/file-bar-chart.svg';

import navbarNames from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const teamsTabId = 'teams';
export const myTeamTabId = 'myTeam';
export const participantInterventionsTabId = 'participantInterventions';
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

const participantInterventionsTab = (message, icon) => ({
  id: participantInterventionsTabId,
  path: '/',
  message,
  icon,
});

const participantReportsTab = (message, icon) => ({
  id: participantReportsTabId,
  path: '/reports',
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
  [Roles.participant]: [
    participantInterventionsTab(navbarNames.participantInterventions, folder),
    participantReportsTab(navbarNames.participantReports, fileBarChart),
  ],
  [Roles.thirdParty]: [],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navigationTabs;
