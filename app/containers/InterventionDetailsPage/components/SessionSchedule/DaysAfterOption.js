import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { numericValidator } from 'utils/validators';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { SCHEDULE_OPTIONS } from 'global/reducers/intervention';

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
      case SCHEDULE_OPTIONS.daysAfterFill:
        return formatMessage(messages.daysAfterFillInfo);
      case SCHEDULE_OPTIONS.daysAfterDate:
        return formatMessage(messages.daysAfterDateInfo);
      case SCHEDULE_OPTIONS.daysAfter:
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
          onCheck={number => setValue(number)}
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
