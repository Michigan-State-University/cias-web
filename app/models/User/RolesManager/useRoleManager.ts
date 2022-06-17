import { useContext } from 'react';
import { arraysOverlap } from 'utils/arrayUtils';
import RolesManagerContext from './RolesManagerContext';
import { Roles } from './UserRoles';

const ALLOWED_DOWNLOAD_INTERVENTION_CSV = [Roles.Admin, Roles.Researcher];

const ALLOWED_ORGANIZATION_SIDEBAR_DISPLAY = [
  Roles.Admin,
  Roles.EInterventionAdmin,
  Roles.ClinicAdmin,
];

const FORBIDDEN_LEFT_SIDEBAR_DISPLAY = [
  Roles.ThirdParty,
  Roles.OrganizationAdmin,
  Roles.HealthSystemAdmin,
];

const FORBIDDEN_FULL_ORGANIZATIONS_ACCESS = [Roles.ClinicAdmin];

const ALLOWED_ADD_ORGANIZATION = [Roles.Admin];

const ALLOWED_DELETE_ORGANIZATION = [Roles.Admin];

const ALLOWED_ASSIGN_ORGANIZATION_TO_INTERVENTION = [
  Roles.Admin,
  Roles.EInterventionAdmin,
];

const ALLOWED_FULL_ORG_ACCESS = [
  Roles.Admin,
  Roles.OrganizationAdmin,
  Roles.EInterventionAdmin,
];

const ALLOWED_CAT_MH_SETTING_DISPLAY = [Roles.Admin, Roles.Researcher];

export const canDisplayLeftSidebar = (userRoles: Roles[]) =>
  !arraysOverlap(userRoles, FORBIDDEN_LEFT_SIDEBAR_DISPLAY);

export const useRoleManager = () => {
  const { userRoles } = useContext(RolesManagerContext);

  const isAdmin = userRoles.includes(Roles.Admin);
  const isHealthClinicAdmin = userRoles.includes(Roles.ClinicAdmin);
  const isHealthSystemAdmin = userRoles.includes(Roles.HealthSystemAdmin);

  const hasFullOrgAccess = arraysOverlap(userRoles, ALLOWED_FULL_ORG_ACCESS);

  const canDownloadInterventionCsv = arraysOverlap(
    userRoles,
    ALLOWED_DOWNLOAD_INTERVENTION_CSV,
  );
  const canDisplayOrganizationSidebar = arraysOverlap(
    userRoles,
    ALLOWED_ORGANIZATION_SIDEBAR_DISPLAY,
  );
  const canAccessOrganizations = !arraysOverlap(
    userRoles,
    FORBIDDEN_FULL_ORGANIZATIONS_ACCESS,
  );
  const canAddNewOrganization = arraysOverlap(
    userRoles,
    ALLOWED_ADD_ORGANIZATION,
  );
  const canDeleteOrganization = arraysOverlap(
    userRoles,
    ALLOWED_DELETE_ORGANIZATION,
  );
  const canAssignOrganizationToIntervention = arraysOverlap(
    userRoles,
    ALLOWED_ASSIGN_ORGANIZATION_TO_INTERVENTION,
  );
  const canDisplayCatMhSetting = arraysOverlap(
    userRoles,
    ALLOWED_CAT_MH_SETTING_DISPLAY,
  );

  return {
    isAdmin,
    isHealthClinicAdmin,
    isHealthSystemAdmin,
    canDisplayCatMhSetting,
    canDownloadInterventionCsv,
    canDisplayOrganizationSidebar,
    canAccessOrganizations,
    canAddNewOrganization,
    canDeleteOrganization,
    canAssignOrganizationToIntervention,
    hasFullOrgAccess,
    userRoles,
  };
};
