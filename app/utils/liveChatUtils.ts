import globalMessages from 'global/i18n/globalMessages';
import { InterlocutorNameData } from 'models/LiveChat';
import { Roles } from 'models/User/RolesManager';
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
      // @ts-ignore
      globalMessages.roles[Roles.Participant],
    )} ID: ${userId.substring(0, 8)}...`;
  }
  return firstName;
};
