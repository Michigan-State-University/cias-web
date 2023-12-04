/*
 * Organizations reducer/saga Messages
 *
 * This contains all the text for the Organizations reducer/saga component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.organizations';

export default defineMessages({
  inviteAdminSuccess: {
    id: `${scope}.inviteAdminSuccess`,
    defaultMessage:
      'Invitation request is being sent. Only users new to the CIAS app will get the invitation!',
  },
  inviteClinicAdminSuccess: {
    id: `${scope}.inviteClinicAdminSuccess`,
    defaultMessage:
      'Invitation request is being sent. Only users new to the CIAS app or heath clinic admins will get the invitation!',
  },
  inviteAdminError: {
    id: `${scope}.inviteAdminError`,
    defaultMessage: 'Failed to invite Admin!',
  },
  inviteAdmin403Error: {
    id: `${scope}.inviteAdmin403Error`,
    defaultMessage:
      'You do not have proper permissions to perform this action!',
  },
  deleteOrganizationSuccess: {
    id: `${scope}.deleteOrganizationSuccess`,
    defaultMessage: 'Organization deleted successfully!',
  },
  deleteOrganizationError: {
    id: `${scope}.deleteOrganizationError`,
    defaultMessage: 'Failed to delete Organization!',
  },
  deleteHealthSystemSuccess: {
    id: `${scope}.deleteHealthSystemSuccess`,
    defaultMessage: 'Health System deleted successfully!',
  },
  deleteHealthSystemError: {
    id: `${scope}.deleteHealthSystemError`,
    defaultMessage: 'Failed to delete Health System!',
  },
  deleteClinicSuccess: {
    id: `${scope}.deleteClinicSuccess`,
    defaultMessage: 'Clinic deleted successfully!',
  },
  deleteClinicError: {
    id: `${scope}.deleteClinicError`,
    defaultMessage: 'Failed to delete Clinic!',
  },
  editEntityError: {
    id: `${scope}.editEntityError`,
    defaultMessage: `Failed to edit! Check {properties} {propertiesCount, plural, one {property} other {properties}}.`,
  },
});
