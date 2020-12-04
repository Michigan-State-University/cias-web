import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import Box from 'components/Box';

import { colors } from 'theme';
import calculateTimeZone from 'utils/calculateTimeZone';

import Row from 'components/Row';
import Column from 'components/Column';
import messages from './messages';

const ExactDateOption = ({
  intl: { formatMessage },
  value,
  setValue,
  disabled,
}) => {
  const timeInfoMessage = () =>
    `${formatMessage(messages.timeInfo)} ${calculateTimeZone()}`;

  const parseDate = date => dayjs(date).format('YYYY-MM-DD');

  const onChange = changeValue => setValue(parseDate(changeValue));

  return (
    <Column>
      <Row align="center">
        <Text ml={5} fontSize={15}>
          {formatMessage(messages.send)}
          {formatMessage(messages.exactDateInfo)}
        </Text>
        <Box>
          <ApprovableInput
            disabled={disabled}
            width={120}
            height={50}
            placeholder={formatMessage(messages.chooseDate)}
            type="date"
            value={Date.parse(value)}
            onCheck={onChange}
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
  disabled: PropTypes.bool,
};

export default injectIntl(ExactDateOption);
