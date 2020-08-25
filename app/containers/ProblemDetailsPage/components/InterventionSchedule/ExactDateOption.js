import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import Box from 'components/Box';

import messages from './messages';

const ExactDateOption = ({ intl: { formatMessage } }) => (
  <>
    <Text ml={5} fontSize={15}>
      {formatMessage(messages.exactDateInfo)}
    </Text>
    <Box>
      <ApprovableInput
        width={130}
        height={50}
        placeholder={formatMessage(messages.chooseDate)}
        type="date"
      />
    </Box>
  </>
);

ExactDateOption.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(ExactDateOption);
