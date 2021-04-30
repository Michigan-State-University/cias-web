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
    defaultMessage: 'Admin invited successfully!',
  },
  inviteAdminError: {
    id: `${scope}.inviteAdminError`,
    defaultMessage: 'Failed to invite Admin!',
  },
  deleteOrganizationSuccess: {
    id: `${scope}.deleteOrganizationSuccess`,
    defaultMessage: 'Organization deleted successfully!',
  },
  deleteOrganizationError: {
    id: `${scope}.deleteOrganizationError`,
    defaultMessage: 'Failed to delete Organization!',
  },
});
