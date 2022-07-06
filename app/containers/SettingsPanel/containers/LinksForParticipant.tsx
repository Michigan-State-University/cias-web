import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H3 from 'components/H3';
import TextButton from 'components/Button/TextButton';
import { ParticipantLink } from 'models/NavigatorSetup';

import { colors, themeColors } from 'theme';

import messages from '../messages';
import NavigatorLinkBox from '../Components/NavigatorLinkBox';

type Props = {
  links: ParticipantLink[];
  addParticipantLink: () => void;
  updateParticipantLink: (
    linkId: string,
    data: Partial<Omit<ParticipantLink, 'id'>>,
  ) => void;
  removeParticipantLink: (linkId: string) => void;
};

export const LinksForParticipant = ({
  links,
  addParticipantLink,
  updateParticipantLink,
  removeParticipantLink,
}: Props) => (
  <>
    <Box display="flex" justify="between" align="end" mb={24}>
      <H3>
        <FormattedMessage {...messages.participantLinks} />
      </H3>
      <TextButton
        buttonProps={{
          color: themeColors.secondary,
        }}
        onClick={addParticipantLink}
      >
        <FormattedMessage {...messages.addNewLink} />
      </TextButton>
    </Box>
    <Box maxHeight={500} overflow="auto">
      {isEmpty(links) && (
        <Box color={colors.slateGray} lineHeight="23px" fontSize={13}>
          <FormattedMessage {...messages.noLinksForParticipant} />
        </Box>
      )}
      {links?.map((link) => (
        <Box mb={8} key={link.id}>
          <NavigatorLinkBox
            updateParticipantLink={(data) =>
              updateParticipantLink(link.id, data)
            }
            removeParticipantLink={() => removeParticipantLink(link.id)}
            link={link}
          />
        </Box>
      ))}
    </Box>
  </>
);

export default LinksForParticipant;
