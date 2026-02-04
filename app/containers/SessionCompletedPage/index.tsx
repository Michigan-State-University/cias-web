import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { colors, elements } from 'theme';

import Column from 'components/Column';
import H1 from 'components/H1';
import Text from 'components/Text';
import Box from 'components/Box';
import Img from 'components/Img';

import messages from './messages';

type LocationState = {
  logoUrl?: string;
  imageAlt?: string;
};

const SessionCompletedPage = () => {
  const { formatMessage } = useIntl();
  const location = useLocation<LocationState>();
  const { logoUrl, imageAlt } = location.state || {};

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Column
        height="100vh"
        width="100%"
        justify="center"
        align="center"
        bg={colors.zirkon}
        padding={24}
      >
        {logoUrl && (
          <Box mb={40}>
            <Img
              maxHeight={elements.interventionLogoSize.height}
              maxWidth={elements.interventionLogoSize.width}
              src={logoUrl}
              aria-label={imageAlt}
            />
          </Box>
        )}
        <Box maxWidth={600} textAlign="center">
          <H1 mb={24}>{formatMessage(messages.header)}</H1>
          <Text fontSize={18} lineHeight={1.5}>
            {formatMessage(messages.description)}
          </Text>
        </Box>
      </Column>
    </>
  );
};

export default SessionCompletedPage;
