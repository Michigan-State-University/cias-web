import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import Box from 'components/Box';

import { themeColors } from 'theme';
import calculateTimeZone from 'utils/calculateTimeZone';
import { getUTCTime, getUTCDateString } from 'utils/dateUtils';

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

  const onChange = (changeValue) => setValue(getUTCDateString(changeValue));

  return (
    <Column>
      <Row align="center" gap={10}>
        <Text ml={5} fontSize={15}>
          {formatMessage(messages.send)}
          {formatMessage(messages.exactDateInfo)}
        </Text>
        <Box>
          <ApprovableInput
            disabled={disabled}
            width={130}
            height={50}
            type="date"
            value={value ? getUTCTime(new Date(value)) : null}
            onCheck={onChange}
            fontSize={15}
            minDate={new Date()}
          />
        </Box>
      </Row>
      <Row mt={10} width="100%" justify="end">
        <Text ml={5} fontSize={12} color={themeColors.warning}>
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
