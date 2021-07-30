import { Roles } from 'models/User/UserRoles';
import { defaultTimeZone } from 'utils/timezones';

export const mapInvitedResearcher = (user) => ({
  id: user.id,
  firstName: '',
  lastName: '',
  fullName: '',
  email: user.email,
  roles: [Roles.researcher],
  avatar: null,
  timeZone: defaultTimeZone,
  active: true,
});
