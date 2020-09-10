import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import { numericValidator } from 'utils/validators';

import messages from './messages';
import { StyledInputWrapper } from './styled';

const DaysAfterOption = ({
  intl: { formatMessage },
  afterFill,
  value,
  setValue,
}) => (
  <>
    <Text fontSize={15}>{formatMessage(messages.send)}</Text>
    <StyledInputWrapper>
      <ApprovableInput
        type="singleline"
        placeholder={formatMessage(messages.enterNumber)}
        validator={numericValidator}
        height={50}
        mr={0}
        value={value}
        onCheck={number => setValue(number)}
        fontSize={15}
        padding={5}
        textAlign="center"
      />
    </StyledInputWrapper>
    <Text fontSize={15}>
      {afterFill
        ? formatMessage(messages.daysAfterFillInfo)
        : formatMessage(messages.daysAfterInfo)}
    </Text>
  </>
);

DaysAfterOption.propTypes = {
  intl: PropTypes.object,
  afterFill: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default injectIntl(DaysAfterOption);
