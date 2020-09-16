import { colors } from 'theme';

export const Roles = {
  admin: 'admin',
  participant: 'participant',
  researcher: 'researcher',
  guest: 'guest',
  allRoles: ['admin', 'participant', 'researcher'],
};

export const RolesColors = {
  [Roles.participant]: colors.jungleGreenLighter,
  [Roles.researcher]: colors.pink,
  [Roles.admin]: colors.buddhaGold,
  [Roles.guest]: colors.azure,
};
