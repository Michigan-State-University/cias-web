import { useIntl } from 'react-intl';
import { FC } from 'react';

import { InterventionInvitation } from 'models/Intervention';

import Text from 'components/Text';

import messages from './messages';
import { NormalizedSessions } from './types';

export type Props = {
  groupedInvitations: InterventionInvitation[];
  normalizedSessions: NormalizedSessions;
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
