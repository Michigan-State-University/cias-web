import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import { numericValidator } from 'utils/validators';

import messages from './messages';
import { StyledInputWrapper } from './styled';

const DaysAfterOption = ({ intl: { formatMessage }, afterFill }) => {
  const [days, setDays] = useState('');

  return (
    <>
      <StyledInputWrapper>
        <ApprovableInput
          type="singleline"
          placeholder={formatMessage(messages.enterNumber)}
          validator={numericValidator}
          height={50}
          mr={0}
          value={days}
          onCheck={value => setDays(value)}
        />
      </StyledInputWrapper>
      <Text fontSize={15}>
        {afterFill
          ? formatMessage(messages.daysAfterFillInfo)
          : formatMessage(messages.daysAfterInfo)}
      </Text>
    </>
  );
};

DaysAfterOption.propTypes = {
  intl: PropTypes.object,
  afterFill: PropTypes.bool,
};

export default injectIntl(DaysAfterOption);
