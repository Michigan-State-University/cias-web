import { colors } from 'theme';
import { Roles } from './UserRoles';

export const RolesColors: Record<Roles, string> = {
  [Roles.Participant]: colors.jungleGreenLighter,
  [Roles.Researcher]: colors.pink,
  [Roles.Admin]: colors.buddhaGold,
  [Roles.TeamAdmin]: colors.navyBlue,
  [Roles.Guest]: colors.azure,
  [Roles.PredefinedParticipant]: colors.jungleGreenLighter,
  [Roles.ThirdParty]: colors.olive,
  [Roles.EInterventionAdmin]: colors.jungleGreen,
  [Roles.OrganizationAdmin]: colors.azure,
  [Roles.HealthSystemAdmin]: colors.orangePeel,
  [Roles.ClinicAdmin]: colors.pink,
  [Roles.Navigator]: colors.burntSienna,
};
