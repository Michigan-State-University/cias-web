import { colors } from 'theme';

export const Roles = {
  admin: 'admin',
  teamAdmin: 'team_admin',
  participant: 'participant',
  researcher: 'researcher',
  guest: 'guest',
  allRoles: ['admin', 'team_admin', 'participant', 'researcher'],
};

export const RolesColors = {
  [Roles.participant]: colors.jungleGreenLighter,
  [Roles.researcher]: colors.pink,
  [Roles.admin]: colors.buddhaGold,
  [Roles.teamAdmin]: colors.navyBlue,
  [Roles.guest]: colors.azure,
};
