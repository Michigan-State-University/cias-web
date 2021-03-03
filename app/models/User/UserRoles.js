import { colors } from 'theme';

export const Roles = {
  admin: 'admin',
  teamAdmin: 'team_admin',
  participant: 'participant',
  researcher: 'researcher',
  guest: 'guest',
  thirdParty: 'third_party',
  allRoles: ['admin', 'team_admin', 'participant', 'researcher', 'third_party'],
};

export const RolesColors = {
  [Roles.participant]: colors.jungleGreenLighter,
  [Roles.researcher]: colors.pink,
  [Roles.admin]: colors.buddhaGold,
  [Roles.teamAdmin]: colors.navyBlue,
  [Roles.guest]: colors.azure,
  [Roles.thirdParty]: colors.olive,
};
