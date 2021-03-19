import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import { numericValidator } from 'utils/validators';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import messages from './messages';
import { StyledInputWrapper } from './styled';

const DaysAfterOption = ({
  intl: { formatMessage },
  afterFill,
  value,
  setValue,
  disabled,
}) => {
  const getValue = () => (isNullOrUndefined(value) ? '' : value);
  return (
    <>
      <Text fontSize={15} wordBreak="normal">
        {formatMessage(messages.send)}
      </Text>
      <StyledInputWrapper>
        <ApprovableInput
          disabled={disabled}
          type="singleline"
          placeholder={formatMessage(messages.enterNumber)}
          validator={numericValidator}
          height={50}
          mr={0}
          value={getValue()}
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
};

DaysAfterOption.propTypes = {
  intl: PropTypes.object,
  afterFill: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default injectIntl(DaysAfterOption);
