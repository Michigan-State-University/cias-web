import { colors } from 'theme';
import { Roles } from './UserRoles';

export const RolesColors = {
  [Roles.Participant]: colors.jungleGreenLighter,
  [Roles.Researcher]: colors.pink,
  [Roles.Admin]: colors.buddhaGold,
  [Roles.TeamAdmin]: colors.navyBlue,
  [Roles.Guest]: colors.azure,
  [Roles.ThirdParty]: colors.olive,
  [Roles.EInterventionAdmin]: colors.jungleGreen,
  [Roles.OrganizationAdmin]: colors.azure,
  [Roles.HealthSystemAdmin]: colors.orangePeel,
  [Roles.ClinicAdmin]: colors.pink,
};
