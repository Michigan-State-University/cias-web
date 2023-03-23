import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { SessionSchedule } from 'models/Session';

import { numericValidator } from 'utils/validators';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';

import messages from './messages';
import { StyledInputWrapper } from './styled';

const DaysAfterOption = ({
  intl: { formatMessage },
  value,
  setValue,
  disabled,
  scheduleOption,
}) => {
  const getValue = () => (isNullOrUndefined(value) ? '' : value);

  const textInfo = useMemo(() => {
    switch (scheduleOption) {
      case SessionSchedule.DAYS_AFTER_FILL:
        return formatMessage(messages.daysAfterFillInfo);
      case SessionSchedule.DAYS_AFTER_DATE:
        return formatMessage(messages.daysAfterDateInfo);
      case SessionSchedule.DAYS_AFTER:
      default:
        return formatMessage(messages.daysAfterInfo);
    }
  }, [scheduleOption]);

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
          onCheck={(number) => setValue(number)}
          fontSize={15}
          padding={5}
          textAlign="center"
        />
      </StyledInputWrapper>
      <Text fontSize={15}>{textInfo}</Text>
    </>
  );
};

DaysAfterOption.propTypes = {
  intl: PropTypes.object,
  scheduleOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default injectIntl(DaysAfterOption);
