import { useIntl } from 'react-intl';
import { FC } from 'react';

import { InterventionInvitation } from 'models/Intervention';
import { Session } from 'models/Session';

import Text from 'components/Text';

import messages from './messages';

export type Props = {
  groupedInvitations: InterventionInvitation[];
  normalizedSessions: Record<Session['id'], Session>;
};

export const SessionInvitationList: FC<Props> = ({
  groupedInvitations,
  normalizedSessions,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Text>{formatMessage(messages.sessionInvitationsCountTitle)}</Text>
      <ul>
        {groupedInvitations.map(({ targetId }) => (
          <li>{normalizedSessions[targetId]?.name}</li>
        ))}
      </ul>
    </>
  );
};
