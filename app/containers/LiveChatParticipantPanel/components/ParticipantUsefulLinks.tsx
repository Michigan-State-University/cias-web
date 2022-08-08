import React from 'react';

import { themeColors } from 'theme';
import { Link } from 'models/NavigatorSetup';

import Box from 'components/Box';
import Text from 'components/Text';

import { LinkPrimaryUnderline } from './styled';

type Props = {
  participantLinks: Link[];
};
const ParticipantUsefulLinks = ({ participantLinks }: Props) => (
  <Box maxHeight="69px" overflow="scroll" width="100%">
    {participantLinks.map(({ displayName, id, url }) => (
      <LinkPrimaryUnderline key={id} target="_blank" href={url}>
        <Text fontSize="14px" mb={4} color={themeColors.primary}>
          {displayName}
        </Text>
      </LinkPrimaryUnderline>
    ))}
  </Box>
);

export default ParticipantUsefulLinks;
