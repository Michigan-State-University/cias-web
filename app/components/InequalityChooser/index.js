/**
 *
 * InequalityChooser
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import { floatValidator } from 'utils/validators';
import { splitAndKeep } from 'utils/splitAndKeep';

import Select from 'components/Select';
import Box from 'components/Box';

import { CaseInput } from './styled';
import messages from './messages';

const signs = ['=', '<', '>', '<=', '>='];

const InequalityChooser = ({
  onSuccessfulChange,
  inequalityValue,
  disabled,
}) => {
  const { formatMessage } = useIntl();

  const populateSelectOption = (sign) => ({
    label: sign,
    value: sign,
  });

  const [inequalitySign, setInequalitySign] = useState(
    populateSelectOption('='),
  );
  const [numericValue, setNumericValue] = useState('');

  useEffect(() => {
    if (inequalityValue) {
      const newNumericValue = splitAndKeep(inequalityValue, signs)[0] ?? '';
      const newInequalitySign = inequalityValue.slice(
        0,
        inequalityValue.length - newNumericValue.length,
      );
      setNumericValue(newNumericValue);
      setInequalitySign(populateSelectOption(newInequalitySign));
    }
  }, [inequalityValue]);

  useEffect(() => {
    if (!disabled && inequalitySign && numericValue) handleSignUpdate();
  }, [inequalitySign, numericValue, disabled]);

  const handleSignUpdate = () => {
    const newValue = `${inequalitySign.value}${numericValue}`;

    if (newValue !== inequalityValue) onSuccessfulChange(newValue);
  };

  const signMapper = signs.map(populateSelectOption);

  return (
    <>
      <Select
        minWidth={60}
        ml={10}
        data-cy="case-select"
        data-testid="select"
        selectProps={{
          isDisabled: disabled,
          bg: colors.linkWater,
          options: signMapper,
          onChange: (value) => setInequalitySign(value),
          value: inequalitySign,
        }}
      />
      <Box bg={colors.linkWater} mx={10}>
        <CaseInput
          data-testid="input"
          data-cy="case-value-input"
          disabled={disabled}
          px={0}
          py={12}
          textAlign="center"
          placeholder="..."
          value={numericValue}
          validator={floatValidator}
          onBlur={(value) => setNumericValue(value)}
          aria-label={formatMessage(messages.inputLabel)}
        />
      </Box>
    </>
  );
};

InequalityChooser.propTypes = {
  inequalityValue: PropTypes.string,
  onSuccessfulChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default memo(InequalityChooser);
