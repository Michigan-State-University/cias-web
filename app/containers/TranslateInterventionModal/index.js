/**
 *
 * TranslateInterventionModal
 *
 */

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { fontSizes, themeColors } from 'theme';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import { StyledButton } from 'components/Button/StyledButton';

import messages from './messages';

const TranslateInterventionModal = ({ name }) => (
  <>
    <H2 mb={10} color={themeColors.primary}>
      {name}
    </H2>
    <H1 mb={20}>
      <FormattedMessage {...messages.title} />
    </H1>
    <Text mb={50} fontSize={fontSizes.regular}>
      <FormattedMessage {...messages.subtitle} />
    </Text>
    <H2 mb={10}>
      <FormattedMessage {...messages.translationSettings} />
    </H2>
    <Comment mb={20}>
      <FormattedMessage {...messages.translationSettingsComment} />
    </Comment>
    <Row mt={50}>
      <Comment width="100%">
        <FormattedMessage {...messages.costsComment} />
      </Comment>
      <StyledButton ml={20} width={200}>
        <FormattedMessage {...messages.translate} />
      </StyledButton>
    </Row>
  </>
);

TranslateInterventionModal.propTypes = {
  name: PropTypes.string.isRequired,
};

export default compose(injectIntl)(TranslateInterventionModal);
