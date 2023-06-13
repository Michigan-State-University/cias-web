import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import H2 from 'components/H2';
import TextButton from 'components/Button/TextButton';
import { Link, LinkData } from 'models/NavigatorSetup';

import { colors, themeColors } from 'theme';

import messages from '../messages';
import LinkBox from './LinkBox';

type Props = {
  title: string;
  noLinksMessage: string;
  links: Link[];
  addingLink: boolean;
  addLink: () => void;
  updateLink: (linkId: string, data: LinkData) => void;
  removeLink: (linkId: string) => void;
  disabled: boolean;
};

export const LinksPanel = ({
  title,
  noLinksMessage,
  links,
  addingLink,
  addLink,
  updateLink,
  removeLink,
  disabled,
}: Props) => (
  <>
    <Box display="flex" justify="between" align="end" mb={24}>
      <H2 fontSize={16} lineHeight="24px">
        {title}
      </H2>
      <TextButton
        buttonProps={{
          color: themeColors.secondary,
        }}
        spinnerProps={{
          size: 21,
        }}
        onClick={addLink}
        loading={addingLink}
        disabled={disabled}
      >
        <FormattedMessage {...messages.addNewLink} />
      </TextButton>
    </Box>
    <Column maxHeight={470} overflow="auto" gap={8}>
      {isEmpty(links) && (
        <Box color={colors.slateGray} lineHeight="23px" fontSize={13}>
          {noLinksMessage}
        </Box>
      )}
      {links?.map((link) => (
        <LinkBox
          updateLink={(data) => updateLink(link.id, data)}
          removeLink={() => removeLink(link.id)}
          link={link}
          key={link.id}
          disabled={disabled}
        />
      ))}
    </Column>
  </>
);

export default LinksPanel;
