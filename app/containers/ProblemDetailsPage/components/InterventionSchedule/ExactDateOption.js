import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import Box from 'components/Box';

import { colors } from 'theme';
import messages from './messages';

const ExactDateOption = ({ intl: { formatMessage }, value, setValue }) => (
  <>
    <Text ml={5} fontSize={15}>
      {formatMessage(messages.send)}
      {formatMessage(messages.exactDateInfo)}
    </Text>
    <Box>
      <ApprovableInput
        width={120}
        height={50}
        placeholder={formatMessage(messages.chooseDate)}
        type="date"
        value={Date.parse(value)}
        onCheck={date => setValue(date)}
        fontSize={15}
      />
    </Box>
    <Text ml={5} fontSize={12} color={colors.flamingo}>
      {formatMessage(messages.timeInfo)}
    </Text>
  </>
);

ExactDateOption.propTypes = {
  intl: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setValue: PropTypes.func,
};

export default injectIntl(ExactDateOption);
