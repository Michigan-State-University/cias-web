import React from 'react';
import { useIntl } from 'react-intl';

import { themeColors, colors } from 'theme';
import { Link } from 'models/NavigatorSetup';

import Box from 'components/Box';
import Text from 'components/Text';

import { LinkPrimaryUnderline } from './styled';
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
      <Box maxHeight="69px" overflow="scroll" width="100%" flexShrink={0}>
        {participantLinks.map(({ displayName, id, url }) => (
          <LinkPrimaryUnderline key={id} target="_blank" href={url}>
            <Text fontSize="14px" mb={4} color={themeColors.primary}>
              {displayName}
            </Text>
          </LinkPrimaryUnderline>
        ))}
      </Box>
    </>
  );
};

export default ParticipantUsefulLinks;
