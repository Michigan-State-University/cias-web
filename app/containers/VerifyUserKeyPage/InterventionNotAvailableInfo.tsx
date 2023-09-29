import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';

import { RoutePath } from 'global/constants';

import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import GhostLink from 'components/GhostLink';
import Column from 'components/Column';

import messages from './messages';

export const InterventionNotAvailableInfo = () => {
  const { formatMessage } = useIntl();

  return (
    <Column height="100%" justify="center" align="center">
      <Text fontSize={24} fontWeight="bold" textAlign="center">
        {formatMessage(messages.studyNotAvailableTitle)}
      </Text>

      <Text mt={10} fontSize={18} textAlign="center">
        {formatMessage(messages.studyNotAvailableDescription)}
      </Text>

      <GhostLink to={RoutePath.DASHBOARD}>
        <StyledButton mt={50} px={30}>
          <FormattedMessage {...messages.toMainPage} />
        </StyledButton>
      </GhostLink>
    </Column>
  );
};