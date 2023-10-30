import { InterlocutorNameData } from 'models/LiveChat';
import { Roles } from 'models/User/RolesManager';

import rolesMessages from 'global/i18n/rolesMessages';

import { formatMessage } from './intlOutsideReact';

export const formatInterlocutorName = (
  interlocutorNameData: Nullable<InterlocutorNameData>,
  isNavigatorView?: boolean,
  shortName?: string,
) => {
  if (!interlocutorNameData) return '?';

  if (shortName && isNavigatorView) return shortName;

  const { userId, firstName } = interlocutorNameData;
  if (isNavigatorView) {
    return `${formatMessage(
      rolesMessages[Roles.Participant],
    )} ID: ${userId.substring(0, 8)}...`;
  }
  return firstName;
};
