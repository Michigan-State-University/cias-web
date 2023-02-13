import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { Link } from 'models/NavigatorSetup';

import Column from 'components/Column';
import Text from 'components/Text';
import { PrimaryLink } from 'components/Links';

import messages from '../messages';

type Props = {
  participantLinks: Nullable<Link[]>;
};

const ParticipantUsefulLinks = ({ participantLinks }: Props) => {
  const { formatMessage } = useIntl();

  if (!participantLinks?.length) return null;

  return (
    <>
      <Text color={colors.bluewood} textOpacity={0.7} mt={32} mb={8}>
        {formatMessage(messages.usefulLinks)}
      </Text>
      <Column flexShrink={0} gap={4}>
        {participantLinks.map(({ displayName, id, url }) => (
          <PrimaryLink key={id} target="_blank" href={url}>
            {displayName}
          </PrimaryLink>
        ))}
      </Column>
    </>
  );
};

export default ParticipantUsefulLinks;
