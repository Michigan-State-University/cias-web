import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import Box from 'components/Box';

import { colors } from 'theme';
import calculateTimeZone from 'utils/calculateTimeZone';

import Row from 'components/Row';
import Column from 'components/Column';
import messages from './messages';

const ExactDateOption = ({ intl: { formatMessage }, value, setValue }) => {
  const timeInfoMessage = () =>
    `${formatMessage(messages.timeInfo)} ${calculateTimeZone()}`;

  return (
    <Column>
      <Row align="center">
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
      </Row>
      <Row mt={10} width="100%" justify="end">
        <Text ml={5} fontSize={12} color={colors.flamingo}>
          {timeInfoMessage()}
        </Text>
      </Row>
    </Column>
  );
};

ExactDateOption.propTypes = {
  intl: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setValue: PropTypes.func,
};

export default injectIntl(ExactDateOption);
