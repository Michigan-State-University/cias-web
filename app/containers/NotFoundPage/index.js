/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import { themeColors } from 'theme';

import messages from './messages';

const NotFoundPage = ({ location, intl: { formatMessage }, history }) => {
  const header = get(
    location,
    'state.header',
    formatMessage(messages.defaultHeader),
  );
  const text = get(location, 'state.text', formatMessage(messages.defaultText));
  const errorCode = get(
    location,
    'state.errorCode',
    formatMessage(messages.defaultErrorCode),
  );

  const handleBack = () => history.goBack();

  return (
    <Box width="100%" height="100%" padding="20px">
      <Column justify="center" align="center" height="100%">
        <Text fontWeight="bold" fontSize="10vw" color={themeColors.primary}>
          {errorCode}
        </Text>
        <Text fontSize={24} fontWeight="bold" mt={50} textAlign="center">
          {header}
        </Text>
        <Text mt={10} fontSize={18} textAlign="center">
          {text}
        </Text>
        <StyledButton mt={50} onClick={handleBack} width={180}>
          <FormattedMessage {...messages.back} />
        </StyledButton>
      </Column>
    </Box>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object,
  intl: intlShape,
  history: PropTypes.object,
};

export default injectIntl(NotFoundPage);
