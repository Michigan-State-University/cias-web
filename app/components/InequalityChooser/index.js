/**
 *
 * InequalityChooser
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { numericValidator } from 'utils/validators';

import Select from 'components/Select';
import Box from 'components/Box';

import { CaseInput } from './styled';
import messages from './messages';

const SIGNS = ['=', '<', '>', '<=', '>='];

const InequalityChooser = ({
  onSuccessfulChange,
  inequalityValue,
  disabled,
  height,
  width,
  bg,
}) => {
  const { formatMessage } = useIntl();

  const populateSelectOption = (sign) => ({
    label: sign,
    value: sign,
  });

  const { inequalitySign, numericValue } = useMemo(() => {
    const newNumericValue = inequalityValue
      ? inequalityValue.replace(/\D/g, '')
      : '';
    const newInequalitySign = inequalityValue
      ? inequalityValue.slice(
          0,
          (inequalityValue?.length ?? 0) - newNumericValue.length,
        )
      : '';

    return {
      numericValue: newNumericValue,
      inequalitySign: populateSelectOption(newInequalitySign),
    };
  }, [inequalityValue]);

  const onChange = (sign, value) => {
    onSuccessfulChange(`${sign ?? ''}${value ?? ''}`);
  };

  const onSignChange = (newSign) => {
    onChange(newSign.value, numericValue);
  };

  const onValueChange = (newValue) => {
    onChange(inequalitySign.value, newValue);
  };

  const signMapper = SIGNS.map(populateSelectOption);

  return (
    <>
      <Select
        minWidth={60}
        ml={10}
        data-cy="case-select"
        data-testid="select"
        selectProps={{
          isDisabled: disabled,
          bg: bg || colors.linkWater,
          options: signMapper,
          onChange: onSignChange,
          value: inequalitySign,
          height,
        }}
      />
      <Box bg={colors.linkWater} mx={10}>
        <CaseInput
          width={width}
          height={height}
          data-testid="input"
          data-cy="case-value-input"
          disabled={disabled}
          px={0}
          py={12}
          textAlign="center"
          placeholder="..."
          value={numericValue}
          validator={numericValidator}
          onBlur={onValueChange}
          aria-label={formatMessage(messages.inputLabel)}
          bg={bg}
        />
      </Box>
    </>
  );
};

InequalityChooser.propTypes = {
  inequalityValue: PropTypes.string,
  onSuccessfulChange: PropTypes.func,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  bg: PropTypes.string,
};

export default memo(InequalityChooser);
