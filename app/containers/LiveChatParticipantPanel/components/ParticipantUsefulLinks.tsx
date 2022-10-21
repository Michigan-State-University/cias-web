import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { Link } from 'models/NavigatorSetup';

import Box from 'components/Box';
import Text from 'components/Text';
import { PrimaryLink } from 'components/Links';

import messages from '../messages';

type Props = {
  participantLinks: Link[];
};

const ParticipantUsefulLinks = ({ participantLinks }: Props) => {
  const { formatMessage } = useIntl();

  if (!participantLinks.length) return null;

  return (
    <>
      <Text color={colors.bluewood} textOpacity={0.7} mt={24} mb={8}>
        {formatMessage(messages.usefulLinks)}
      </Text>
      <Box width="100%" flexShrink={0}>
        {participantLinks.map(({ displayName, id, url }) => (
          <PrimaryLink key={id} target="_blank" href={url}>
            {displayName}
          </PrimaryLink>
        ))}
      </Box>
    </>
  );
};

export default ParticipantUsefulLinks;
